import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentSingleComponent } from './single/single.component';
import { PostViewModule } from 'src/app/shared/post-view/post-view.module';


@NgModule({
  declarations: [
    DepartmentSingleComponent
  ],
  imports: [
    CommonModule,
    PostViewModule,
    DepartmentsRoutingModule
  ]
})
export class DepartmentsModule { }
