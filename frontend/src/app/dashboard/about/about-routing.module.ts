import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutListingComponent } from './listing/listing.component';
import { AboutUpdateComponent } from './update/update.component';

const routes: Routes = [
  { 
    path: 'list',
    component: AboutListingComponent,
   },
   { 
     path: 'new',
     component: AboutUpdateComponent, 
   },
   { 
     path: ':title',
     component: AboutUpdateComponent, 
   },
   { path: '', redirectTo:'list', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
