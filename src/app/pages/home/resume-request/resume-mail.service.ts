import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResumeMailService {
  async send(email: string, resumeLink: string): Promise<void> {
    await emailjs.send(
      environment.emailjs.serviceId,
      environment.emailjs.resumeTemplateId,
      {
        to_email: email,
        resume_link: resumeLink
      },
      { publicKey: environment.emailjs.publicKey }
    );
  }
}
