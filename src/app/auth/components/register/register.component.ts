import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/shared/types/appState.interface';
import { AuthService } from '../../services/auth.service';
import { ActionTypes } from '../../store/actionTypes';
import { registerAction } from '../../store/register.action';
import { isSubmittingSelector } from '../../store/selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private authService: AuthService,
  ) {}

  // loginFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isSubmitting$.subscribe((...a) =>
      console.log('agrs from subscribe', a),
    );
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
    if (!this.form.valid) {
      return;
    }
    this.store.dispatch(registerAction(this.form.value));
    this.authService.register(this.form.value).subscribe((currentUser) => {
      console.log('currentUser', currentUser);
    });
  }
}
