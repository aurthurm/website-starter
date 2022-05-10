import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutSingleComponent } from './single/single.component';
import { PostViewModule } from 'src/app/shared/post-view/post-view.module';


@NgModule({
  declarations: [
    AboutSingleComponent
  ],
  imports: [
    CommonModule,
    PostViewModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
