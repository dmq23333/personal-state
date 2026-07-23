import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    WorkExperienceItem,
    WorkExperienceService
} from './work-experience.service';
import { CareerCtaComponent } from '../../shared/components/career-cta/career-cta.component';

@Component({
    selector: 'app-work-experience',
    standalone: true,
    imports: [CommonModule, CareerCtaComponent],
    templateUrl: './work-experience.component.html',
    styleUrl: './work-experience.component.scss'
})
export class WorkExperienceComponent implements OnInit {
    workExperience: WorkExperienceItem[] = [];

    constructor(private workExperienceService: WorkExperienceService) { }

    ngOnInit(): void {
        this.workExperience = this.workExperienceService.getWorkExperience();
    }
}
