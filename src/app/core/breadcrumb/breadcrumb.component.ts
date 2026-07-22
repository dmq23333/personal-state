import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  crumbs = toSignal(this.breadcrumbService.crumbs$(), {
    initialValue: []
  });

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void { }
}
