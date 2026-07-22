import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NAV_ITEMS } from './nav.config';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  navItems = NAV_ITEMS;

  constructor(private router: Router) { }

  isActive(path: string): boolean {
    return this.router.url === path || (path !== '/' && this.router.url.startsWith(path));
  }
}


