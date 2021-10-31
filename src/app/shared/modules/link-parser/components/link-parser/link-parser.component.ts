import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IApiErrors } from 'src/app/shared/types/apiErrors.interface';
import { IAppState } from 'src/app/shared/types/appState.interface';

@Component({
  selector: 'app-link-parser',
  templateUrl: './link-parser.component.html',
  styleUrls: ['./link-parser.component.sass'],
})
export class LinkParserComponent implements OnInit {
  link: FormControl;
  apiErrors$: Observable<IApiErrors | null>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.link = new FormControl('', [Validators.required]);
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.apiErrors$ = this.store.pipe(select(apiErrorsSelector));
  }
}
