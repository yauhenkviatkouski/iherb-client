import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { apiErrorsSelector } from 'src/app/auth/store/selectors';
import { IApiErrors } from 'src/app/shared/types/apiErrors.interface';
import { IAppState } from 'src/app/shared/types/appState.interface';
import { parseLinkAction } from '../../store/parseLink.action';
import { isParsingSelector } from '../../store/selectors';

@Component({
  selector: 'app-link-parser',
  templateUrl: './link-parser.component.html',
  styleUrls: ['./link-parser.component.sass'],
})
export class LinkParserComponent implements OnInit {
  link: FormControl;
  apiErrors$: Observable<IApiErrors | null>;
  isParsing$: Observable<boolean>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.link = new FormControl('', [
      Validators.required,
      Validators.pattern(/.+iherb.com/g),
    ]);
  }

  initializeValues(): void {
    this.isParsing$ = this.store.pipe(select(isParsingSelector));
    this.apiErrors$ = this.store.pipe(select(apiErrorsSelector));
  }

  onSubmit(): void {
    this.store.dispatch(
      parseLinkAction({ request: { link: this.link.value } }),
    );
  }
}
