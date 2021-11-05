import { Component, Input, OnInit } from '@angular/core';
import { IApiErrors } from 'src/app/shared/types/apiErrors.interface';

@Component({
  selector: 'app-api-error-messages',
  templateUrl: './api-error-messages.component.html',
  styleUrls: ['./api-error-messages.component.scss'],
})
export class ApiErrorMessagesComponent implements OnInit {
  @Input('apiErrors') apiErrorsProps: IApiErrors;

  errorMessages: string[];

  constructor() {}

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.apiErrorsProps).map(
      (errorName) => `${errorName}: ${this.apiErrorsProps[errorName]}`,
    );
  }
}
