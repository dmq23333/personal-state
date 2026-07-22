import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResumeMailService } from './resume-mail.service';

@Component({
  selector: 'app-resume-request-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resume-request-dialog.component.html',
  styleUrl: './resume-request-dialog.component.scss'
})
export class ResumeRequestDialogComponent {
  @Output() onClose = new EventEmitter<void>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  submitState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  constructor(
    private fb: FormBuilder,
    private mailService: ResumeMailService
  ) { }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitState.set('sending');

    try {
      await this.mailService.send(
        this.form.value.email!,
        `${window.location.origin}/assets/resume.pdf`
      );
      this.submitState.set('success');
      this.form.reset();
      setTimeout(() => this.onClose.emit(), 2000);
    } catch (err) {
      console.error('Resume send failed', err);
      this.submitState.set('error');
    }
  }
}
