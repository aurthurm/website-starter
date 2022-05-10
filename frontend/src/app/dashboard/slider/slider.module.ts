import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderRoutingModule } from './slider-routing.module';
import { SliderUpdateComponent } from './update/update.component';
import { SliderListingComponent } from './listing/listing.component';
import { PostEditorModule } from 'src/app/shared/post-editor/post-editor.module';


@NgModule({
  declarations: [
    SliderUpdateComponent,
    SliderListingComponent
  ],
  imports: [
    CommonModule,
    PostEditorModule,
    SliderRoutingModule
  ]
})
export class SliderModule { }
