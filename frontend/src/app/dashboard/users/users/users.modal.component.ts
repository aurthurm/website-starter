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
import { IUser } from '../users.model';

@Component({
  selector: 'app-users.modal',
  templateUrl: './users.modal.component.html',
  styleUrls: ['./users.modal.component.scss']
})
export class UsersModalComponent implements OnInit {
  @ViewChild('modalComponent') modal: | ModalComponent<UsersModalComponent>| undefined;
  
  user!: IUser;
  userForm: FormGroup;
  subscription!: Subscription;
  passwordsError = "";

  constructor(
    private modalStateService: ModalStateService,
    public fb: FormBuilder
  ) { 
    this.userForm = this.fb.group({
      _id: [],
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [null,[]],
      passwordc: [null,[]],
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
    const data = this.userForm.value;
    if(data['password'] !== data['passwordc']){
      this.passwordsError = "passwords dont match"
      return;
    }
    delete data['passwordc']
    if(['',' ', null, undefined].includes(data['password'])){
      delete data['password']
    }
    this.modalStateService.changeState(data)
    await this.close();
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }

  updateForm(user: IUser): void {
    this.userForm.patchValue({
      _id: user?._id,
      userName: user?.userName,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });
  }
}
