import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get name() {
    return this.contactForm.get('name')!;
  }

  get email() {
    return this.contactForm.get('email')!;
  }

  get subject() {
    return this.contactForm.get('subject')!;
  }

  get message() {
    return this.contactForm.get('message')!;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.successMessage = 'Your message was sent, thank you!';
      this.errorMessage = '';
      this.contactForm.reset();
      this.formSubmitted = false;
    } else {
      this.successMessage = '';
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
