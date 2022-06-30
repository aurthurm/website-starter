import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UsersModalComponent } from './users/users.modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal/modal.module';


@NgModule({
  declarations: [
    UsersComponent,
    UsersModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
  ]
})
export class UsersModule { }
