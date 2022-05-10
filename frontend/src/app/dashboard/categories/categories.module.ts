import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { ModalModule } from 'src/app/shared/modal/modal.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesModalComponent } from './categories/categories-modal.component';

@NgModule({
  declarations: [CategoriesComponent, CategoriesModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  providers: []
})
export class CategoriesModule { }
