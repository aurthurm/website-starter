import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './dashboard/layout/base/base.component';
import { FourOfourComponent } from './four0four/four0four.component';
import { AuthGuard } from './login/auth.guard';

import { LoginComponent } from './login/login.component';
import { WebLayoutComponent } from './weblog/layout/base/layout-base.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'admin', 
    redirectTo: 'dashboard', 
    pathMatch: "full" 
  },
  { 
    path: '', 
    component: WebLayoutComponent,
    loadChildren: () => import('./weblog/weblog.module').then(m => m.WeblogModule)
  },
  { path: '**', component: FourOfourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }