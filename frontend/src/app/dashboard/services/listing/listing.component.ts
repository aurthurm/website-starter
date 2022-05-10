import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { IAppData, IAppDataState } from 'src/app/shared/models/app-data';

import Swal from 'sweetalert2'
import { ServicesService } from '../service/services.service';
import { IService } from '../services.model';

@Component({
  selector: 'dashboard-services-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ServicesListingComponent implements OnInit {
  dataState$!: Observable<IAppDataState<IService>>;
  private dataSubject = new BehaviorSubject<IAppData<IService>>({} as any);

  constructor(
    private servicesService: ServicesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataState$ = this.servicesService.services$
    .pipe(
      map(res => {
        this.dataSubject.next({ items: res })
        return { loading: false, data: { items: res } }
      }),
      startWith({ loading: true }),
      catchError((error: string) => of({ loading: false, error }))
    )
  }

  editService(about: IService) {
    this.router.navigate(['dashboard/services', about?.title]);
  }

  deleteService(about: IService): void {
    Swal.fire({
      title: 'Delete service',
      text: about.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataState$ = this.servicesService.delete$(about._id!)
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
