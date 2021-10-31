import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkParserComponent } from './components/link-parser/link-parser.component';
import { MaterialModule } from '../material/material.module';
import { ApiErrorMessagesModule } from '../api-error-messages/api-error-messages.module';

@NgModule({
  declarations: [LinkParserComponent],
  imports: [CommonModule, MaterialModule, ApiErrorMessagesModule],
  exports: [LinkParserComponent],
})
export class LinkParserModule {}
