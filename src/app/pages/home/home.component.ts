import { Component, OnDestroy, OnInit, signal } from '@angular/core';

import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../shared/models/project.model';
import { CareerCtaComponent } from '../../shared/components/career-cta/career-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CareerCtaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  projects = signal<Project[]>([]);

  private readonly phrases = [
    'Java · Spring Boot · Microservices',
    'Angular · TypeScript · Reactive UI',
    'Kubernetes · Dockers · CI/CD',
    'Java Engineer with Applied AI Experience'
  ];
  typedText = signal('');
  private phraseIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private timer?: ReturnType<typeof setTimeout>;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe((list) => this.projects.set(list));
    this.tick();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private tick(): void {
    const current = this.phrases[this.phraseIndex];
    const speed = this.deleting ? 35 : 65;

    if (!this.deleting && this.charIndex <= current.length) {
      this.typedText.set(current.slice(0, this.charIndex));
      this.charIndex++;

      if (this.charIndex > current.length) {
        this.timer = setTimeout(() => {
          this.deleting = true;
          this.tick();
        }, 1400);
        return;
      }
    } else if (this.deleting && this.charIndex >= 0) {
      this.typedText.set(current.slice(0, this.charIndex));
      this.charIndex--;

      if (this.charIndex < 0) {
        this.deleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        this.charIndex = 0;
      }
    }

    this.timer = setTimeout(() => this.tick(), speed);
  }
}
