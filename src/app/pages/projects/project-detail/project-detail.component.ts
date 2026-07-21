import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../shared/models/project.model';

@Component({
    selector: 'app-project-detail',
    imports: [],
    template: `
    @if (project) {
      <article class="project-detail">
        <p class="meta">{{ project.role }} · {{ project.period }}</p>
        <h1>{{ project.title }}</h1>
        <p class="summary">{{ project.summary }}</p>

        <h2>Tech Stack</h2>
        <div class="stack">
          @for (tech of project.stack; track tech) {
            <span class="tag">{{ tech }}</span>
          }
        </div>

        <h2>What I Did</h2>
        <ul>
          @for (item of project.highlights; track item) {
            <li>{{ item }}</li>
          }
        </ul>
      </article>
    } @else {
      <p>Project not found.</p>
    }
  `,
    styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.projectService.getBySlug(slug).subscribe((project) => {
      this.project = project;
      if (project) {
        this.titleService.setTitle(`${project.title} · Your Name`);
        // Dynamically inject the current project name into the last breadcrumb segment
        this.route.snapshot.data['breadcrumbLabel'] = project.title;
      }
    });
  }
}
