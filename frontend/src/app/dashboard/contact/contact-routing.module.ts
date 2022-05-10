import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactInboxComponent } from './inbox/contact-inbox.component';

const routes: Routes = [
  { 
   path: 'inbox',
   component: ContactInboxComponent,
  },
  { path: '', redirectTo:'inbox', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
