import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminLayoutComponent } from './layout/base/base.component';
import { NavbarMainComponent } from './layout/navbar-main/navbar-main.component';
import { NavbarAsideComponent } from './layout/navbar-aside/navbar-aside.component';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';
import { DashboardComponent } from './dashboard.component';
import { DepartmentsModule } from './department/department.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { ServicesModule } from './services/services.module';
import { SliderModule } from './slider/slider.module';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarMainComponent,
    NavbarAsideComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    UsersModule,
    DashboardRoutingModule,
    ArticlesModule,
    DepartmentsModule,
    TagsModule,
    CategoriesModule,
    AboutModule,
    ContactModule,
    ServicesModule,
    SliderModule,
  ],
})
export class DashboardModule { }
