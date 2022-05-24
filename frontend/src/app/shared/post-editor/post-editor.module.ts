import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { PostEditorComponent } from './post-editor.component';
import { GalleryComponent } from 'src/app/gallery/gallery.component';


@NgModule({
  declarations: [
    PostEditorComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  exports: [
    PostEditorComponent,
    
  ]
})
export class PostEditorModule { }
