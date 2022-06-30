import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2'

import { IUser } from '../users.model';
import { UsersService } from '../service/users.service';
import { IAppData, IAppDataState } from 'src/app/shared/models/app-data';
import { ModalService } from 'src/app/shared/modal/modal.service';
import {UsersModalComponent as UsersModalComponentType } from './users.modal.component';
import { ModalStateService } from 'src/app/shared/modal/modal-state.service';
import { isObjectEmpty } from 'src/app/shared/utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataState$!: Observable<IAppDataState<IUser>>;
  private dataSubject = new BehaviorSubject<IAppData<IUser>>({} as any);

  user!: IUser;
  subscription!: Subscription;

  constructor(
    private modalStateService: ModalStateService,
    private usersService: UsersService,
    private modalService: ModalService<UsersModalComponentType>,
  ) {}

  ngOnInit(): void {
    this.dataState$ = this.usersService.users$
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
        this.user = state;
        this.modalStateService.resetState();
        this.save(state)
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async showUserModal(user: any = undefined): Promise<void> {
    if(user){
      await this.modalStateService.changeInitialState(user);
      this.showUserModal()
    }
    const {UsersModalComponent } = await import(
      './users.modal.component'
    );
    await this.modalService.open(UsersModalComponent);
  }

  save(user: IUser): void {
    const create = ['',null,undefined].includes(user._id)
    this.dataState$ = this.usersService.save$(user)
    .pipe(
      map(res => {
        console.log(res)
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

  filterUsers(event: any): void {
    // console.log(event, )
    // this.dataState$ = this.usersService.filter$(event.target.value, this.dataSubject.value?.items || [])
    // .pipe(
    //   map(res => {
    //     return { loading: false, data: { items: res } }
    //   }),
    //   startWith({ loading: false, data: this.dataSubject.value } as any),
    //   catchError((error: any) => of({ loading:false, error }))
    // )
  }

  deleteUser(user: IUser): void {
    Swal.fire({
      title: 'Delete user',
      text: user.firstName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataState$ = this.usersService.delete$(user._id!)
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
