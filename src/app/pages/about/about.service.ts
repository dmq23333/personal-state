import { Injectable } from '@angular/core';

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class AboutService {
  getWorkExperience(): WorkExperience[] {
    return [
      {
        title: 'Senior Product Designer',
        company: 'Nova Systems Interactive',
        period: '2021 — Present',
        description: 'Leading the UI revitalization project for a global SaaS platform, resulting in a 40% increase in user retention.'
      },
      {
        title: 'Frontend Architect',
        company: 'Aether Creative Agency',
        period: '2018 — 2021',
        description: 'Architected design systems for Fortune 500 clients using modern component-based frameworks.'
      }
    ];
  }

  getEducation(): Education[] {
    return [
      {
        degree: 'MSc in Human-Computer Interaction',
        institution: 'Stanford University',
        year: '2016 — 2018',
        description: 'Specialization in cognitive ergonomics and immersive interface design. Graduated with Distinguished Honors.'
      },
      {
        degree: 'BSc in Computer Science',
        institution: 'Massachusetts Institute of Technology',
        year: '2012 — 2016',
        description: 'Focused on algorithmic efficiency and full-stack development. Active member of the AI Research Lab.'
      },
      {
        degree: 'Certified Product Management',
        institution: 'Product School New York',
        year: '2019',
        description: 'Intensive professional certification focused on user-centric product lifecycles and market strategy.'
      }
    ];
  }

  getCompetencies(): string[] {
    return [
      'UI/UX Design',
      'Tailwind CSS',
      'React.js',
      'Node.js',
      'Figma Mastery',
      'Three.js',
      'Brand Identity'
    ];
  }
}
