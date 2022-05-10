import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';

import Swal from 'sweetalert2'

import { IAppData, IAppDataState } from 'src/app/shared/models/app-data';
import { ISlide } from '../slider.model';
import { SliderService } from '../services/service.service';

@Component({
  selector: 'dashboard-slider-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class SliderListingComponent implements OnInit {

  dataState$!: Observable<IAppDataState<ISlide>>;
  private dataSubject = new BehaviorSubject<IAppData<ISlide>>({} as any);

  constructor(
    private sliderService: SliderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataState$ = this.sliderService.slides$
    .pipe(
      map(res => {
        this.dataSubject.next({ items: res })
        return { loading: false, data: { items: res } }
      }),
      startWith({ loading: true }),
      catchError((error: string) => of({ loading: false, error }))
    )
  }

  editSlide(slide: ISlide) {
    this.router.navigate(['dashboard/carousel', slide?.title]);
  }

  deleteSlide(slide: ISlide): void {
    Swal.fire({
      title: 'Delete slide',
      text: slide.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataState$ = this.sliderService.delete$(slide._id!)
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
