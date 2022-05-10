import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesListingComponent } from './listing/listing.component';
import { ServicesUpdateComponent } from './update/update.component';
import { PostEditorModule } from 'src/app/shared/post-editor/post-editor.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ServicesListingComponent,
    ServicesUpdateComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    PostEditorModule,
    FormsModule
  ]
})
export class ServicesModule { }
