import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService, WorkExperience, Education } from './about.service';
import { CareerCtaComponent } from '../../shared/components/career-cta/career-cta.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CareerCtaComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  workExperience: WorkExperience[] = [];
  education: Education[] = [];
  competencies: string[] = [];

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.workExperience = this.aboutService.getWorkExperience();
    this.education = this.aboutService.getEducation();
    this.competencies = this.aboutService.getCompetencies();
  }
}
