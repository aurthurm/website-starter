import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutSingleComponent } from './single/single.component';

const routes: Routes = [
  { path: ':title', component: AboutSingleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
