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
        degree: 'Master of Information Technology',
        institution: 'University of New South Wales',
        year: 'Sep 2019 - Aug 2021',
        specialization: 'Faculty of Engineering',
        description: 'Sydney, Australia. Relevant courses: Web Frontend Programming, Database Systems, Machine Learning & Data Mining.'
      },
      {
        degree: 'Bachelor of Software Engineering',
        institution: 'East China Jiaotong University',
        year: 'Sep 2015 - Jun 2019',
        specialization: 'Faculty of Software Engineering',
        description: 'Nanchang, China. Relevant courses: C++ Programming, Java Programming, JSP Web Programming.'
      }
    ];
  }

  getCertifications(): Certification[] {
    return [];
  }

  getKeySkills(): string[] {
    return [
      'Full-Stack Development',
      'System Architecture',
      'Data Structures & Algorithms',
      'Machine Learning Basics',
      'Database Design',
      'API Development'
    ];
  }

  getCoursework(): string[] {
    return [
      'Web Application Programming',
      'Database Systems',
      'Machine Learning & Data Mining',
      'TypeScript Programming',
      'Java Programming',
      'JSP Web Programming',
      'Python Programming',
      'Software Engineering Principles',
      'Operating Systems',
      'Computer Networks',
      'Data Structures & Algorithms'
    ];
  }
}
