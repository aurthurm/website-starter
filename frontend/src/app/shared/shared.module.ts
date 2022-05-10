import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from './modal/modal.module';
import { PostEditorModule } from './post-editor/post-editor.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule,
    PostEditorModule
  ],
})
export class SharedModule { }
