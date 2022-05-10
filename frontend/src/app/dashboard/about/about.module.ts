import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutListingComponent } from './listing/listing.component';
import { AboutUpdateComponent } from './update/update.component';
import { PostEditorModule } from 'src/app/shared/post-editor/post-editor.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AboutListingComponent,
    AboutUpdateComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    PostEditorModule,
    FormsModule
  ]
})
export class AboutModule { }
