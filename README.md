# personal-site

A minimal Angular personal portfolio site: homepage + project detail pages + email contact form (powered by EmailJS, no backend required).

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