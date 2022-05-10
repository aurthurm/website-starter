import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { SingleComponent } from './single/single.component';

const routes: Routes = [
  { path: '', component: ListingComponent },
  { path: ':slug', component: SingleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
