import { Component, OnInit } from '@angular/core';

import { RouterLink, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Crumb {
  label: string;
  url: string;
}

/**
 * Builds breadcrumbs from data.breadcrumb across the current route tree.
 * If this later gets split into separate Angular apps on different subdomains,
 * this file and the Crumb interface can be copied as-is / extracted into a
 * shared lib — no cross-domain communication needed, since a breadcrumb is
 * just a plain <a href>.
 */
@Component({
    selector: 'app-breadcrumb',
    imports: [RouterLink],
    template: `
    @if (crumbs().length > 1) {
      <nav class="breadcrumb" aria-label="Breadcrumb">
        @for (crumb of crumbs(); track crumb.url; let last = $last) {
          @if (!last) {
            <a [routerLink]="crumb.url">{{ crumb.label }}</a>
            <span class="sep">/</span>
          } @else {
            <span class="current" aria-current="page">{{ crumb.label }}</span>
          }
        }
      </nav>
    }
  `,
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  crumbs = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.buildCrumbs(this.activatedRoute.root.snapshot))
    ),
    { initialValue: [] as Crumb[] }
  );

  ngOnInit(): void {}

  private buildCrumbs(
    snapshot: ActivatedRouteSnapshot,
    parentUrl = '',
    crumbs: Crumb[] = [{ label: 'Home', url: '/' }]
  ): Crumb[] {
    const childUrlSegment = snapshot.url.map((s) => s.path).join('/');
    const url = childUrlSegment ? `${parentUrl}/${childUrlSegment}` : parentUrl;

    if (snapshot.data['breadcrumb'] && url !== '/') {
      // If the route carries a dynamic param (e.g. project slug), prefer the title set via resolve/component
      const label = snapshot.data['breadcrumbLabel'] ?? snapshot.data['breadcrumb'];
      crumbs = [...crumbs, { label, url: url || '/' }];
    }

    if (snapshot.firstChild) {
      return this.buildCrumbs(snapshot.firstChild, url, crumbs);
    }
    return crumbs;
  }
}
