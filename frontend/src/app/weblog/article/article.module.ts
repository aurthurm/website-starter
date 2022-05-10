import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ListingComponent } from './listing/listing.component';
import { SingleComponent } from './single/single.component';
import { PostViewModule } from 'src/app/shared/post-view/post-view.module';


@NgModule({
  declarations: [
    ListingComponent,
    SingleComponent
  ],
  imports: [
    CommonModule,
    PostViewModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
