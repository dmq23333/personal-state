const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const port = Number(process.env.PORT || 8080);
const serviceName = process.env.SERVICE_NAME || 'contact-mail-api';
const serviceVersion = process.env.SERVICE_VERSION || '1.0.0';

const rateWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const maxRequestsPerIp = Number(process.env.RATE_LIMIT_MAX_PER_IP || 30);
const maxRequestsPerEmail = Number(process.env.RATE_LIMIT_MAX_PER_EMAIL || 8);
const minSecondsBetweenSameEmail = Number(process.env.MIN_SECONDS_BETWEEN_SAME_EMAIL || 30);

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '200kb' }));

const ipRateBuckets = new Map();
const emailRateBuckets = new Map();
const duplicateMessageBuckets = new Map();

function nowIso() {
    return new Date().toISOString();
}

function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.length > 0) {
        return forwarded.split(',')[0].trim();
    }
    return req.ip || req.socket?.remoteAddress || 'unknown';
}

function log(level, event, fields = {}) {
    const payload = {
        timestamp: nowIso(),
        level,
        service: serviceName,
        version: serviceVersion,
        event,
        ...fields
    };
    console.log(JSON.stringify(payload));
}

function pruneAndPush(map, key, timestamp) {
    const bucket = map.get(key) || [];
    const pruned = bucket.filter((t) => timestamp - t <= rateWindowMs);
    pruned.push(timestamp);
    map.set(key, pruned);
    return pruned;
}

function isRateLimited(map, key, maxAllowed, timestamp) {
    const bucket = pruneAndPush(map, key, timestamp);
    return bucket.length > maxAllowed;
}

function hashMessage(email, message) {
    return crypto
        .createHash('sha256')
        .update(`${email.trim().toLowerCase()}|${message.trim()}`)
        .digest('hex');
}

let cachedSmtpReady = false;
let cachedSmtpCheckedAt = 0;
const smtpCheckCacheMs = Number(process.env.SMTP_VERIFY_CACHE_MS || 30000);

async function smtpReady() {
    const now = Date.now();
    if (now - cachedSmtpCheckedAt < smtpCheckCacheMs) {
        return cachedSmtpReady;
    }

    try {
        await transporter.verify();
        cachedSmtpReady = true;
    } catch (error) {
        cachedSmtpReady = false;
        log('warn', 'smtp_verify_failed', {
            error: error instanceof Error ? error.message : String(error)
        });
    }

    cachedSmtpCheckedAt = now;
    return cachedSmtpReady;
}

app.use((req, res, next) => {
    req.requestId =
        (typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id']) ||
        crypto.randomUUID();
    req.startTime = Date.now();

    res.setHeader('x-request-id', req.requestId);

    res.on('finish', () => {
        const latencyMs = Date.now() - req.startTime;
        log('info', 'http_request', {
            requestId: req.requestId,
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            latencyMs,
            ip: getClientIp(req),
            userAgent: req.get('user-agent') || 'unknown'
        });
    });

    next();
});

function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

const smtpHost = requireEnv('SMTP_HOST');
const smtpPort = Number(requireEnv('SMTP_PORT'));
const smtpUser = requireEnv('SMTP_USER');
const smtpPass = requireEnv('SMTP_PASS');
const mailFrom = requireEnv('MAIL_FROM');
const mailTo = requireEnv('MAIL_TO');

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
        user: smtpUser,
        pass: smtpPass
    }
});

app.get('/healthz', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        check: 'liveness',
        service: serviceName,
        version: serviceVersion,
        timestamp: nowIso(),
        uptimeSeconds: Math.round(process.uptime())
    });
});

app.get('/readyz', async (_req, res) => {
    const ready = await smtpReady();
    const payload = {
        status: ready ? 'ok' : 'degraded',
        check: 'readiness',
        service: serviceName,
        version: serviceVersion,
        smtpReady: ready,
        timestamp: nowIso(),
        uptimeSeconds: Math.round(process.uptime())
    };

    res.status(ready ? 200 : 503).json(payload);
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message, company } = req.body || {};
    const requestId = req.requestId;
    const ip = getClientIp(req);
    const timestamp = Date.now();

    // Honeypot: bots filling this field should get a fake success response.
    if (company) {
        log('warn', 'contact_honeypot_triggered', { requestId, ip });
        return res.status(200).json({ ok: true });
    }

    if (
        typeof name !== 'string' || !name.trim() || name.length > 60 ||
        typeof email !== 'string' || !email.includes('@') || email.length > 120 ||
        (typeof message !== 'undefined' && typeof message !== 'string')
    ) {
        log('warn', 'contact_validation_failed', { requestId, ip });
        return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    const normalizedMessage = typeof message === 'string' ? message.trim() : '';
    if (normalizedMessage.length > 2000) {
        log('warn', 'contact_validation_failed', { requestId, ip });
        return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    if (isRateLimited(ipRateBuckets, ip, maxRequestsPerIp, timestamp)) {
        log('warn', 'contact_rate_limited_ip', { requestId, ip });
        return res.status(429).json({ ok: false, error: 'Too many requests' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (isRateLimited(emailRateBuckets, normalizedEmail, maxRequestsPerEmail, timestamp)) {
        log('warn', 'contact_rate_limited_email', { requestId, ip, email: normalizedEmail });
        return res.status(429).json({ ok: false, error: 'Too many requests' });
    }

    const emailBucket = emailRateBuckets.get(normalizedEmail) || [];
    if (emailBucket.length > 1) {
        const previousTs = emailBucket[emailBucket.length - 2];
        if ((timestamp - previousTs) / 1000 < minSecondsBetweenSameEmail) {
            log('warn', 'contact_rate_limited_email_burst', {
                requestId,
                ip,
                email: normalizedEmail
            });
            return res.status(429).json({ ok: false, error: 'Too many requests' });
        }
    }

    const urlMatches = normalizedMessage.match(/https?:\/\//gi);
    if (urlMatches && urlMatches.length > 2) {
        log('warn', 'contact_spam_suspected_links', {
            requestId,
            ip,
            email: normalizedEmail,
            links: urlMatches.length
        });
        return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    const fingerprint = hashMessage(normalizedEmail, normalizedMessage);
    const seenAt = duplicateMessageBuckets.get(fingerprint);
    if (seenAt && timestamp - seenAt < 10 * 60 * 1000) {
        log('warn', 'contact_duplicate_suppressed', { requestId, ip, email: normalizedEmail });
        return res.status(200).json({ ok: true });
    }
    duplicateMessageBuckets.set(fingerprint, timestamp);

    try {
        await transporter.sendMail({
            from: mailFrom,
            to: mailTo,
            replyTo: email.trim(),
            subject: `Portfolio contact from ${name.trim()}`,
            text: [
                `Name: ${name.trim()}`,
                `Email: ${email.trim()}`,
                '',
                'Message:',
                normalizedMessage || '(No message provided)'
            ].join('\n')
        });

        log('info', 'contact_mail_sent', {
            requestId,
            ip,
            email: normalizedEmail
        });

        return res.status(200).json({ ok: true });
    } catch (error) {
        log('error', 'contact_mail_send_failed', {
            requestId,
            ip,
            email: normalizedEmail,
            error: error instanceof Error ? error.message : String(error)
        });
        return res.status(500).json({ ok: false, error: 'Send failed' });
    }
});

app.listen(port, () => {
    log('info', 'service_started', {
        port,
        allowedOrigin,
        rateWindowMs,
        maxRequestsPerIp,
        maxRequestsPerEmail,
        minSecondsBetweenSameEmail
    });
});
