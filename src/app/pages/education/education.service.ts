import { Injectable } from '@angular/core';

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description: string;
  specialization?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class EducationService {
  getEducation(): EducationItem[] {
    return [
      {
        degree: 'MSc in Human-Computer Interaction',
        institution: 'Stanford University',
        year: '2016 — 2018',
        specialization: 'Cognitive Ergonomics & Immersive Interface Design',
        description: 'Specialization in cognitive ergonomics and immersive interface design. Graduated with Distinguished Honors.'
      },
      {
        degree: 'BSc in Computer Science',
        institution: 'Massachusetts Institute of Technology',
        year: '2012 — 2016',
        specialization: 'Algorithmic Efficiency & Full-Stack Development',
        description: 'Focused on algorithmic efficiency and full-stack development. Active member of the AI Research Lab.'
      }
    ];
  }

  getCertifications(): Certification[] {
    return [
      {
        title: 'Certified Product Management',
        issuer: 'Product School New York',
        year: '2019',
        description: 'Intensive professional certification focused on user-centric product lifecycles and market strategy.'
      }
    ];
  }

  getKeySkills(): string[] {
    return [
      'Full-Stack Development',
      'UI/UX Design',
      'System Architecture',
      'Data Structures & Algorithms',
      'Machine Learning Basics',
      'Database Design',
      'API Development',
      'Cloud Deployment'
    ];
  }

  getCoursework(): string[] {
    return [
      'Advanced Algorithms',
      'Human-Computer Interaction',
      'Systems Design',
      'Machine Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Database Systems',
      'Software Engineering',
      'Web Technologies',
      'Mobile Development'
    ];
  }
}
