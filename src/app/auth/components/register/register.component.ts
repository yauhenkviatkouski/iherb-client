import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  // loginFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group(
      {
        login: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ]),
        passwordConfirm: new FormControl('', [Validators.required]),
      },
      {
        validators: [this.validateMatchingPasswords],
      },
    );
  }

  validateMatchingPasswords(control: AbstractControl) {
    if (
      control.get('password')?.value === control.get('passwordConfirm')?.value
    ) {
      return null;
    }
    const error = {
      matching: true,
    };
    control.get('passwordConfirm')?.setErrors(error);
    return {};
  }

  onSubmit(): void {
    console.log(this.form);
  }
}
