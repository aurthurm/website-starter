import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2'

import { ITag } from '../tag.model';
import { TagsService } from '../service/tags.service';
import { IAppData, IAppDataState } from 'src/app/shared/models/app-data';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { TagsModalComponent as TagsModalComponentType } from './tags-modal.component';
import { ModalStateService } from 'src/app/shared/modal/modal-state.service';
import { isObjectEmpty } from 'src/app/shared/utils';


@Component({
  selector: 'dashboard-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  dataState$!: Observable<IAppDataState<ITag>>;
  private dataSubject = new BehaviorSubject<IAppData<ITag>>({} as any);

  tags!: ITag;
  subscription!: Subscription;

  constructor(
    private modalStateService: ModalStateService,
    private tagsService: TagsService,
    private modalService: ModalService<TagsModalComponentType>,
  ) {}

  ngOnInit(): void {
    this.dataState$ = this.tagsService.tags$
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
        this.tags = state;
        this.modalStateService.resetState();
        this.save(state)
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async showTagModal(tags: any = undefined): Promise<void> {
    if(tags){
      await this.modalStateService.changeInitialState(tags);
      this.showTagModal()
    }
    const { TagsModalComponent } = await import(
      './tags-modal.component'
    );
    await this.modalService.open(TagsModalComponent);
  }

  save(tag: ITag): void {
    const create = ['',null,undefined].includes(tag._id)
    this.dataState$ = this.tagsService.save$(tag)
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

  filterTags(event: any): void {
    console.log(event, )
    this.dataState$ = this.tagsService.filter$(event.target.value, this.dataSubject.value?.items || [])
    .pipe(
      map(res => {
        return { loading: false, data: { items: res } }
      }),
      startWith({ loading: false, data: this.dataSubject.value } as any),
      catchError((error: any) => of({ loading:false, error }))
    )
  }

  deleteTag(tag: ITag): void {
    Swal.fire({
      title: 'Delete Tag',
      text: tag.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataState$ = this.tagsService.delete$(tag._id!)
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
