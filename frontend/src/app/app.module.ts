import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { WeblogModule } from './weblog/weblog.module';
import { FourOfourComponent } from './four0four/four0four.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { ModalStateService } from './shared/modal/modal-state.service';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    FourOfourComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    WeblogModule,
    SharedModule,
    LoginModule,
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy,
    },
    ModalStateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
