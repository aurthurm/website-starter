import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesSingleComponent } from './single/single.component';

const routes: Routes = [
  { path: ':title', component: ServicesSingleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
