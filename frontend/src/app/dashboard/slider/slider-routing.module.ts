import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderListingComponent } from './listing/listing.component';
import { SliderUpdateComponent } from './update/update.component';

const routes: Routes = [
  { 
    path: 'list',
    component: SliderListingComponent,
   },
   { 
     path: 'new',
     component: SliderUpdateComponent, 
   },
   { 
     path: ':title',
     component: SliderUpdateComponent, 
   },
   { path: '', redirectTo:'list', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliderRoutingModule { }
