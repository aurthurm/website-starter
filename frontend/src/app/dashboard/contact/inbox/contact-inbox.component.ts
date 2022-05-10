import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { IAppData, IAppDataState } from 'src/app/shared/models/app-data';
import { IContact } from '../contact.model';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'dasboard-contact-inbox',
  templateUrl: './contact-inbox.component.html',
  styleUrls: ['./contact-inbox.component.scss']
})
export class ContactInboxComponent implements OnInit {
  dataState$!: Observable<IAppDataState<IContact>>;
  private dataSubject = new BehaviorSubject<IAppData<IContact>>({} as any);

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.fetchMessages(true)
  }

  fetchMessages(initial: boolean):void {
    this.dataState$ = this.contactService.contacts$(0, 25)
    .pipe(
      map(res => {
        this.dataSubject.next({ items: res.results })
        return { loading: false, data: { items: res.results } }
      }),
      startWith(initial === true ? { loading: true } : { loading: false, data: this.dataSubject.value }),
      catchError((error: string) => of({ loading: false, error }))
    )
  }

  filterContacts(event: any): void {
    const query =  event.target.value;
    const searchParams = {
      firstName: query,
      lastName: query,
      subject: query,
      email: query,
    }
    this.filter(searchParams)
  }

  filterOpened(opened: string): void {
    if(opened === ''){
      this.fetchMessages(false)
    } else if (opened === 'true'){
      this.filter({ opened: true })
    } else {
      this.filter({ opened: false })
    }
  }

  filter(query:any): void {
    this.dataState$ = this.contactService.filter$(query)
    .pipe(
      map(res => {
        return { loading: false, data: { items: res } }
      }),
      startWith({ loading: false, data: this.dataSubject.value }),
      catchError((error: any) => of({ loading:false, error }))
    )
  }
}
