import { Routes } from '@angular/router';

// data.breadcrumb is read by BreadcrumbComponent to build the breadcrumb text
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./pages/projects/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent
      ),
    data: { breadcrumb: 'Projects' } // The specific project name is appended dynamically in the component
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    data: { breadcrumb: 'Contact' }
  },
  { path: '**', redirectTo: '' }
];
