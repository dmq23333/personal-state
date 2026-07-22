import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from './core/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BreadcrumbComponent],
  template: `
    <app-breadcrumb />
    <main class="site-main">
      <router-outlet />
    </main>
    <footer class="site-footer">
      <span>&copy; {{ year }} Mengqi Deng</span>
    </footer>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  year = new Date().getFullYear();
}
