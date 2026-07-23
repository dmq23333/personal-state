import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../shared/models/project.model';
import { CareerCtaComponent } from '../../shared/components/career-cta/career-cta.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CareerCtaComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects = signal<Project[]>([]);
  private wideProjectSlugs = new Set<string>();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe((list) => {
      this.projects.set(list);
      this.assignPseudoRandomWidths(list);
    });
  }

  isWideCard(project: Project): boolean {
    return this.wideProjectSlugs.has(project.slug);
  }

  private assignPseudoRandomWidths(list: Project[]): void {
    if (!list.length) {
      this.wideProjectSlugs.clear();
      return;
    }

    const wideSlugs = new Set<string>();

    // Pair cards by row: each row has exactly 2 cards and one wide(8) + one medium(4).
    for (let i = 0; i < list.length; i += 2) {
      const first = list[i];
      const second = list[i + 1];
      const rowIndex = Math.floor(i / 2);

      if (!second) {
        // Fallback for odd counts: keep the last single card wide.
        wideSlugs.add(first.slug);
        continue;
      }

      // Keep pseudo-random widths by row, but enforce row 3 as [small, large].
      const firstIsWide =
        rowIndex === 2
          ? false
          : this.hashToNumber(`${first.slug}|${second.slug}|${rowIndex}`) % 2 === 0;
      wideSlugs.add(firstIsWide ? first.slug : second.slug);
    }

    this.wideProjectSlugs = wideSlugs;
  }

  private hashToNumber(input: string): number {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash +=
        (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
  }
}
