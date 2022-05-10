import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesListingComponent } from './listing/listing.component';
import { ServicesUpdateComponent } from './update/update.component';

const routes: Routes = [
  { 
    path: 'list',
    component: ServicesListingComponent,
   },
   { 
     path: 'new',
     component: ServicesUpdateComponent, 
   },
   { 
     path: ':title',
     component: ServicesUpdateComponent, 
   },
   { path: '', redirectTo:'list', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
