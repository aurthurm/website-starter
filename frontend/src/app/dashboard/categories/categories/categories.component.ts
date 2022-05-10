import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2'

import { ICategory } from '../category.model';
import { CategoriesService } from '../service/categories.service';
import { IAppData, IAppDataState } from 'src/app/shared/models/app-data';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { CategoriesModalComponent as CategoriesModalComponentType } from './categories-modal.component';
import { ModalStateService } from 'src/app/shared/modal/modal-state.service';
import { isObjectEmpty } from 'src/app/shared/utils';


@Component({
  selector: 'dashboard-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  dataState$!: Observable<IAppDataState<ICategory>>;
  private dataSubject = new BehaviorSubject<IAppData<ICategory>>({} as any);

  category!: ICategory;
  subscription!: Subscription;

  constructor(
    private modalStateService: ModalStateService,
    private categoriesService: CategoriesService,
    private modalService: ModalService<CategoriesModalComponentType>,
  ) {}

  ngOnInit(): void {
    this.dataState$ = this.categoriesService.categories$
    .pipe(
      map(res => {
        this.dataSubject.next({ items: res })
        return { loading: false, data: { items: res } }
      }),
      startWith({ loading: true }),
      catchError((error: string) => of({ loading: false, error }))
    )

    this.subscription = this.modalStateService.currentState.subscribe((state: any) => {
      if(!isObjectEmpty(state)){
        this.category = state;
        this.modalStateService.resetState();
        this.save(state)
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async showCategoryModal(category: any = undefined): Promise<void> {
    if(category){
      await this.modalStateService.changeInitialState(category);
      this.showCategoryModal()
    }
    const { CategoriesModalComponent } = await import(
      './categories-modal.component'
    );
    await this.modalService.open(CategoriesModalComponent);
  }

  save(category: ICategory): void {
    const create = ['',null,undefined].includes(category._id)
    this.dataState$ = this.categoriesService.save$(category)
    .pipe(
      map(res => {
        if(create === true){
          this.dataSubject.next({ items: [res, ...(this.dataSubject.value.items || [])] })
        } else {
          const index = this.dataSubject.value.items?.findIndex(item => item._id === res._id)!;
          this.dataSubject.value.items![index] = res;
        }
        return { loading: false, data: this.dataSubject.value }
      }),
      startWith({ loading: false, data: this.dataSubject.value } as any),
      catchError((error: any) => of({ loading:false, error }))
    )
  }

  filterCategories(event: any): void {
    console.log(event, )
    this.dataState$ = this.categoriesService.filter$(event.target.value, this.dataSubject.value?.items || [])
    .pipe(
      map(res => {
        return { loading: false, data: { items: res } }
      }),
      startWith({ loading: false, data: this.dataSubject.value } as any),
      catchError((error: any) => of({ loading:false, error }))
    )
  }

  deleteCategory(category: ICategory): void {
    Swal.fire({
      title: 'Delete category',
      text: category.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataState$ = this.categoriesService.delete$(category._id!)
        .pipe(
          map(res => {
            if(res._id){
              const index = this.dataSubject.value.items?.findIndex(item => item._id === res._id)!;
              this.dataSubject.value.items?.splice(index, 1);
            }
            return { loading: false, data: this.dataSubject.value }
          }),
          startWith({ loading: false, data: this.dataSubject.value } as any),
          catchError((error: any) => of({ loading:false, error }))
        )
      }
    })
  }

}
