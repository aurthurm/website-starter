import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostViewComponent } from './post-view.component';


@NgModule({
  declarations: [
    PostViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostViewComponent
  ]
})
export class PostViewModule { }
