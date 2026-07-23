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
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then((m) => m.ProjectsComponent),
    data: { breadcrumb: 'Projects' }
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
  {
    path: 'work-experience',
    loadComponent: () =>
      import('./pages/work-experience/work-experience.component').then(
        (m) => m.WorkExperienceComponent
      ),
    data: { breadcrumb: 'Work Experience' }
  },
  { path: 'about', redirectTo: 'work-experience' },
  {
    path: 'education',
    loadComponent: () =>
      import('./pages/education/education.component').then((m) => m.EducationComponent),
    data: { breadcrumb: 'Education' }
  },
  { path: '**', redirectTo: '' }
];
