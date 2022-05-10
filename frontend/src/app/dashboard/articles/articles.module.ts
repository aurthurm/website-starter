import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UpdateArticleComponent } from './update/update-article.component';
import { ListArticleComponent } from './list/list-article.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { PostEditorModule } from 'src/app/shared/post-editor/post-editor.module';


@NgModule({
  declarations: [
    UpdateArticleComponent,
    ListArticleComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    PostEditorModule,
    FormsModule
  ]
})
export class ArticlesModule { }
