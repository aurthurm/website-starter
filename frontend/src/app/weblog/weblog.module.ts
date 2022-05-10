import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebLayoutComponent } from './layout/base/layout-base.component';
import { WeblogRoutingModule } from './weblog-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ArticleModule } from './article/article.module';
import { DepartmentsModule } from './departments/departments.module';
import { AboutModule } from './about/about.module';
import { ServicesModule } from './services/services.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContactModule } from './contact/contact.module';
import { HomeSliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    WebLayoutComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    HomeSliderComponent,
  ],
  imports: [
    CommonModule,
    WeblogRoutingModule,
    ArticleModule,
    DepartmentsModule,
    AboutModule,
    ServicesModule,
    ContactModule,
  ],
  exports: [
    HomeSliderComponent
  ]
})
export class WeblogModule { }
