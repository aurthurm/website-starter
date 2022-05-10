import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesSingleComponent } from './single/single.component';
import { PostViewModule } from 'src/app/shared/post-view/post-view.module';


@NgModule({
  declarations: [
    ServicesSingleComponent
  ],
  imports: [
    CommonModule,
    PostViewModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
