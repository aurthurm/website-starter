import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { IAppData, IAppDataState } from 'src/app/shared/models/app-data';

import Swal from 'sweetalert2'
import { IAbout } from '../about.model';
import { AboutService } from '../service/about.service';

@Component({
  selector: 'dashboard-about-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class AboutListingComponent implements OnInit {

  dataState$!: Observable<IAppDataState<IAbout>>;
  private dataSubject = new BehaviorSubject<IAppData<IAbout>>({} as any);

  constructor(
    private aboutService: AboutService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataState$ = this.aboutService.abouts$
    .pipe(
      map(res => {
        this.dataSubject.next({ items: res })
        return { loading: false, data: { items: res } }
      }),
      startWith({ loading: true }),
      catchError((error: string) => of({ loading: false, error }))
    )
  }

  editAbout(about: IAbout) {
    this.router.navigate(['dashboard/about', about?.title]);
  }

  deleteAbout(about: IAbout): void {
    Swal.fire({
      title: 'Delete about',
      text: about.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataState$ = this.aboutService.delete$(about._id!)
        .pipe(
          map(res => {
            if(res._id){
              const index = this.dataSubject.value?.items?.findIndex(item => item._id === res._id)!;
              this.dataSubject.value.items?.splice(index, 1);
            }
            return { loading: false, data: this.dataSubject.value }
          }),
          startWith({ loading: false, data: this.dataSubject.value }),
          catchError((error: any) => of({ loading:false, error }))
        )
      }
    })
  }

}
