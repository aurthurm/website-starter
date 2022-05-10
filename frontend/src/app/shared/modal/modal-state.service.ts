import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalStateService {

  private state = new BehaviorSubject({});
  currentState = this.state.asObservable();

  private initial = new BehaviorSubject({});
  initialState = this.initial.asObservable();

  constructor() { }

  changeState(newState: any) {
    this.state.next(newState)
  }

  resetState() {
    this.changeState({})
  }

  changeInitialState(newState: any) {
    this.initial.next(newState)
  }

  resetInitialState() {
    this.changeInitialState({})
  }

}