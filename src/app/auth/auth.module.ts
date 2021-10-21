import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
  ],
})
export class AuthModule {}
