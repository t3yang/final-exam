import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set-b',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './set-b.component.html',
  styleUrls: ['./set-b.component.css']
})
export class SetBComponent {
  registrationForm: FormGroup;
  registrationMessage: string | null = null; // Property to hold the registration message

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, this.strongPasswordValidator]]
    });
  }

  // Custom validator for strong password
  strongPasswordValidator(control: AbstractControl) {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    const valid = hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && isValidLength;

    return valid ? null : { strongPassword: true };
  }

  // Method to handle form submission
  onSubmit() {
    if (this.registrationForm.valid) {
      // Here you can handle the registration logic (e.g., send data to the server)
      this.registrationMessage = "Registration complete!"; // Set the success message

      // Optionally, clear the form after submission
      this.registrationForm.reset();

      // Optionally, hide the message after a few seconds
      setTimeout(() => {
        this.registrationMessage = null;
      }, 3000); // Hide after 3 seconds
    }
  }

  // Getters for form controls
  get username() {
    return this.registrationForm.get('username');
  }

  get mobile() {
    return this.registrationForm.get('mobile');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }
}