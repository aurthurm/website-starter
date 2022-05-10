import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArticleComponent } from './list/list-article.component';
import { UpdateArticleComponent } from './update/update-article.component';

const routes: Routes = [
  { 
   path: 'list',
   component: ListArticleComponent,
  },
  { 
    path: 'new',
    component: UpdateArticleComponent, 
  },
  { 
    path: ':slug',
    component: UpdateArticleComponent, 
  },
  { path: '', redirectTo:'list', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
