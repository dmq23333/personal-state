import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

export interface Crumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  crumbs$(): Observable<Crumb[]> {
    return this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.buildCrumbs(this.activatedRoute.root.snapshot))
    );
  }

  private buildCrumbs(
    snapshot: ActivatedRouteSnapshot,
    parentUrl = '',
    crumbs: Crumb[] = [{ label: 'Home', url: '/' }]
  ): Crumb[] {
    const childUrlSegment = snapshot.url.map((s) => s.path).join('/');
    const url = childUrlSegment ? `${parentUrl}/${childUrlSegment}` : parentUrl;

    if (snapshot.data['breadcrumb'] && url !== '/') {
      const label = snapshot.data['breadcrumbLabel'] ?? snapshot.data['breadcrumb'];
      crumbs = [...crumbs, { label, url: url || '/' }];
    }

    if (snapshot.firstChild) {
      return this.buildCrumbs(snapshot.firstChild, url, crumbs);
    }
    return crumbs;
  }
}
