import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UpdateDepartmentComponent } from './update/update-department.component';
import { ListDepartmentComponent } from './list/list-department.component';
import { DepartmentsRoutingModule } from './department-routing.module';
import { PostEditorModule } from 'src/app/shared/post-editor/post-editor.module';


@NgModule({
  declarations: [
    UpdateDepartmentComponent,
    ListDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    PostEditorModule,
    FormsModule
  ]
})
export class DepartmentsModule { }
