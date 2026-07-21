import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from './core/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, BreadcrumbComponent],
    template: `
    <header class="site-header">
      <a class="brand" routerLink="/">Your Name</a>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/contact">Contact</a>
      </nav>
    </header>

    <app-breadcrumb />

    <main>
      <router-outlet />
    </main>

    <footer class="site-footer">
      <span>&copy; {{ year }} Your Name</span>
    </footer>
  `,
    styleUrl: './app.component.scss'
})
export class AppComponent {
  year = new Date().getFullYear();
}
