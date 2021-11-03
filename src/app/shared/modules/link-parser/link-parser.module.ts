import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkParserComponent } from './components/link-parser/link-parser.component';
import { MaterialModule } from '../material/material.module';
import { ApiErrorMessagesModule } from '../api-error-messages/api-error-messages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { LinkParserEffect } from './store/parseLink.effects';
import { reducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { LinkParserService } from './services/linkParser.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LinkParserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ApiErrorMessagesModule,
    MatIconModule,
    ReactiveFormsModule,
    StoreModule.forFeature('linkParser', reducer),
    EffectsModule.forFeature([LinkParserEffect]),
  ],
  exports: [LinkParserComponent],
  providers: [LinkParserService],
})
export class LinkParserModule {}
