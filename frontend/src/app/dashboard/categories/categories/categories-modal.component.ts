import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalStateService } from 'src/app/shared/modal/modal-state.service';

import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { isObjectEmpty } from 'src/app/shared/utils';
import { ICategory } from '../category.model';

@Component({
  selector: 'app-category-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesModalComponent implements OnInit, OnDestroy {
  @ViewChild('modalComponent') modal: | ModalComponent<CategoriesModalComponent>| undefined;
  
  category!: ICategory;
  categoryForm: FormGroup;
  subscription!: Subscription;

  constructor(
    private modalStateService: ModalStateService,
    public fb: FormBuilder
  ) { 
    this.categoryForm = this.fb.group({
      _id: [],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.subscription = this.modalStateService.initialState.subscribe((state: any) => {
      if(!isObjectEmpty(state)){
        this.updateForm(state)
        this.modalStateService.resetInitialState();
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async createRecord(): Promise<void> {
    this.modalStateService.changeState(this.categoryForm.value)
    await this.close();
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }

  updateForm(category: ICategory): void {
    this.categoryForm.patchValue({
      _id: category?._id,
      title: category?.title,
      content: category?.content,
    });
  }
}