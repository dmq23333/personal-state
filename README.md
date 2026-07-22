# personal-site

A minimal Angular personal portfolio site: homepage + project detail pages + email contact form.

## Commands

```bash
npm install
npm start                # http://localhost:4200
npm run build            # Development build
npm run build:prod       # Production build (output: dist/personal-site)
npm run watch            # Watch mode
```

## Directory Structure

```
src/app/
  app.component.ts              Root component: header + breadcrumb + router-outlet
  app.routes.ts                 Route definitions, breadcrumb text driven by data.breadcrumb
  core/
    breadcrumb/                 Breadcrumb component
    services/project.service.ts  Reads static JSON, no backend dependency
  pages/
    home/                       Homepage, displays project cards
    projects/project-detail/    Individual project detail page
    contact/                    Contact form
  shared/models/project.model.ts
src/assets/data/projects.json   Project data source
```

## Contact Mail (Kubernetes Secret, not in Git)

Contact form now calls `POST /api/contact` instead of sending mail directly from browser.

### 1) Backend mail API

Backend service is in `mail-api/`:

```bash
cd mail-api
npm install
npm start   # runs on :8080
```

### 2) Kubernetes Secret (local file only)

Copy template and fill real values:

```bash
cp k8s/contact-mail-secret.example.yaml k8s/contact-mail-secret.yaml
```

`k8s/contact-mail-secret.yaml` is in `.gitignore`, so it will not be pushed to GitHub.

Apply manifests:

```bash
kubectl apply -f k8s/contact-mail-secret.yaml
kubectl apply -f k8s/contact-mail-api.deployment.yaml
```

### 3) Frontend API URL

Frontend uses `environment.contactApiUrl` (default: `/api/contact`).
Configure your ingress/reverse-proxy so `/api/contact` routes to `contact-mail-api` service.