import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories/categories.component';
import { DashboardComponent } from './dashboard.component';
import { TagsComponent } from './tags/tags/tags.component';
import { UsersComponent } from './users/users/users.component';

const routes: Routes = [
  { 
    path: 'overview',
    component: DashboardComponent,
  },
  { 
    path: 'users',
    component: UsersComponent
  },
  { 
    path: 'tags',
    component: TagsComponent,
  },
  { 
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'articles',
    loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule),
  },
  {
    path: 'departments',
    loadChildren: () => import('./department/department.module').then(m => m.DepartmentsModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'carousel',
    loadChildren: () => import('./slider/slider.module').then(m => m.SliderModule),
  },
  { path: '', redirectTo:'overview', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
