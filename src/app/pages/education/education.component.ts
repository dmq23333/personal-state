import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService, EducationItem, Certification } from './education.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit {
  educationItems: EducationItem[] = [];
  certifications: Certification[] = [];
  keySkills: string[] = [];
  coursework: string[] = [];

  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.educationItems = this.educationService.getEducation();
    this.certifications = this.educationService.getCertifications();
    this.keySkills = this.educationService.getKeySkills();
    this.coursework = this.educationService.getCoursework();
  }
}
