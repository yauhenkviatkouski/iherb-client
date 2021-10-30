import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiErrorMessagesComponent } from './components/api-error-messages/api-error-messages.component';

@NgModule({
  declarations: [ApiErrorMessagesComponent],
  imports: [CommonModule],
  exports: [ApiErrorMessagesComponent],
})
export class ApiErrorMessagesModule {}
