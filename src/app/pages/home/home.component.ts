import { Component, OnInit, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../shared/models/project.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-home',
    imports: [RouterLink, ReactiveFormsModule],
    template: `
    <section class="hero">
      <h1>Your Name</h1>
      <p class="tagline">Java Full-Stack Engineer · Payment Systems · Transitioning to AI Engineer</p>
      <button class="cta" (click)="resumeModalOpen.set(true)">Download Resume</button>
    </section>

    @if (resumeModalOpen()) {
      <div class="modal-overlay" (click)="resumeModalOpen.set(false)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h2>Request Resume</h2>
          <form [formGroup]="resumeForm" (ngSubmit)="submitResume()">
            <div class="field">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" />
              @if (resumeForm.get('email')?.invalid && resumeForm.get('email')?.touched) {
                <span class="error">Please enter a valid email</span>
              }
            </div>
            <div class="actions">
              <button type="submit" [disabled]="resumeSubmitState() === 'sending'">
                @switch (resumeSubmitState()) {
                  @case ('sending') { Sending… }
                  @default { Send Resume }
                }
              </button>
              <button type="button" (click)="resumeModalOpen.set(false)">Cancel</button>
            </div>
            @if (resumeSubmitState() === 'success') {
              <p class="status success">Resume sent — check your email!</p>
            }
            @if (resumeSubmitState() === 'error') {
              <p class="status error">Failed to send. Please try again or contact me directly.</p>
            }
          </form>
          <button class="close" (click)="resumeModalOpen.set(false)">✕</button>
        </div>
      </div>
    }

    <section class="projects">
      <h2>Projects</h2>
      <ul>
        @for (project of projects; track project.slug) {
          <li>
            <a [routerLink]="['/projects', project.slug]">
              <h3>{{ project.title }}</h3>
              <p>{{ project.summary }}</p>
              <div class="stack">
                @for (tech of project.stack; track tech) {
                  <span class="tag">{{ tech }}</span>
                }
              </div>
            </a>
          </li>
        }
      </ul>
    </section>
  `,
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  resumeModalOpen = signal(false);
  resumeSubmitState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  resumeForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe((list) => (this.projects = list));
  }

  async submitResume(): Promise<void> {
    if (this.resumeForm.invalid) {
      this.resumeForm.markAllAsTouched();
      return;
    }

    this.resumeSubmitState.set('sending');

    try {
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.resumeTemplateId,
        {
          to_email: this.resumeForm.value.email,
          resume_link: `${window.location.origin}/assets/resume.pdf`
        },
        { publicKey: environment.emailjs.publicKey }
      );
      this.resumeSubmitState.set('success');
      this.resumeForm.reset();
      setTimeout(() => this.resumeModalOpen.set(false), 2000);
    } catch (err) {
      console.error('Resume send failed', err);
      this.resumeSubmitState.set('error');
    }
  }
}
