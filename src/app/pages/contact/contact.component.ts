import { Component, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

@Component({
    selector: 'app-contact',
    imports: [ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
  state = signal<SubmitState>('idle');

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''], // Honeypot field: real users never fill it, bots usually do — simple anti-spam
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
  });

  constructor(private fb: FormBuilder) {}

  get f() {
    return this.form.controls;
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Honeypot field was filled — silently discard, give bots no feedback
    if (this.form.value.company) {
      this.state.set('success');
      this.form.reset();
      return;
    }

    this.state.set('sending');

    try {
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name: this.form.value.name,
          from_email: this.form.value.email,
          message: this.form.value.message
        },
        { publicKey: environment.emailjs.publicKey }
      );
      this.state.set('success');
      this.form.reset();
    } catch (err) {
      console.error('EmailJS send failed', err);
      this.state.set('error');
    }
  }
}
