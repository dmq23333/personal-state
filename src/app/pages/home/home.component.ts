import { Component, OnInit, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../shared/models/project.model';
import { ResumeRequestDialogComponent } from './resume-request/resume-request-dialog.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ResumeRequestDialogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects = signal<Project[]>([]);
  resumeModalOpen = signal(false);

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe((list) => this.projects.set(list));
  }
}
