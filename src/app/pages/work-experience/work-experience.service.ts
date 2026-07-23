import { Injectable } from '@angular/core';

export interface WorkExperienceItem {
    role: string;
    company: string;
    period: string;
    location: string;
    summary: string;
    highlights: string[];
    stack: string[];
}

@Injectable({ providedIn: 'root' })
export class WorkExperienceService {
    getWorkExperience(): WorkExperienceItem[] {
        return [
            {
                role: 'Java Engineer',
                company: 'ANP Technology Pty Ltd',
                period: 'Mar 2024 - Present',
                location: 'Sydney',
                summary:
                    'Backend-focused full-stack engineer building a multi-tenant payment and risk-control platform for workflow orchestration and configurable limit management.',
                highlights: [
                    'Designed core backend modules using Java 17-25 and Spring Boot with DDD and Hexagonal Architecture',
                    'Built tenant-level limit management with amount, time-window, and channel constraints',
                    'Implemented tenant-aware RBAC and data isolation across services',
                    'Delivered event-driven components with Outbox pattern and Redis Streams',
                    'Improved distributed workflow coordination via lease-based scheduling'
                ],
                stack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'DDD', 'Hexagonal Architecture']
            },
            {
                role: 'Independent Full-Stack Developer',
                company: 'Personal Projects',
                period: 'Oct 2023 - Mar 2024',
                location: 'Sydney',
                summary:
                    'Built multiple production-style systems including event-driven payment processing, high-concurrency ordering, and BPMN workflow automation.',
                highlights: [
                    'Implemented Outbox consistency, idempotent consumers, retry, and DLQ for payment microservices',
                    'Built flash-sale inventory controls with Redis + Lua and Kafka decoupling',
                    'Developed BPMN workflow platform with Camunda and asynchronous timer jobs'
                ],
                stack: ['Spring Boot', 'Kafka', 'Redis', 'MySQL', 'Camunda', 'Angular']
            },
            {
                role: 'Java Engineer',
                company: 'Articulate Pty Ltd',
                period: 'Oct 2021 - Oct 2023',
                location: 'Sydney, Australia',
                summary:
                    'Full-stack contributor to a high-traffic supplier aggregation platform for online gaming, exposing unified APIs to downstream clients.',
                highlights: [
                    'Built backend services with Spring Boot and PostgreSQL plus Vue.js frontend interfaces',
                    'Developed dynamic log and alert pipeline for supplier request failures',
                    'Contributed to CI/CD, deployment, and infrastructure monitoring workflows'
                ],
                stack: ['Spring Boot', 'PostgreSQL', 'Vue.js', 'CI/CD', 'Monitoring']
            },
            {
                role: 'Java Developer',
                company: 'Jiangxi JieChuang Internet of Things Technology CO. LTD.',
                period: 'Jan 2019 - Aug 2019',
                location: 'Nanchang, China',
                summary:
                    'Contributed to Java web-service development, MySQL data operations, and API test automation in an IoT-focused engineering team.',
                highlights: [
                    'Developed web services using Java Spring MVC',
                    'Implemented database operations and data access workflows in MySQL',
                    'Assisted in building automated testing scripts for REST APIs'
                ],
                stack: ['Java', 'Spring MVC', 'MySQL', 'REST API Testing']
            }
        ];
    }
}
