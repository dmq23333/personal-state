import { Component, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
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
    message: ['', [Validators.maxLength(2000)]]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

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
      await firstValueFrom(
        this.http.post(environment.contactApiUrl, {
          name: this.form.value.name,
          email: this.form.value.email,
          message: this.form.value.message
        })
      );
      this.state.set('success');
      this.form.reset();
    } catch (err) {
      console.error('Contact mail send failed', err);
      this.state.set('error');
    }
  }
}
