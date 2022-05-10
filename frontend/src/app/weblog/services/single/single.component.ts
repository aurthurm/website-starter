import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { ServicesService } from 'src/app/dashboard/services/service/services.service';
import { IService } from 'src/app/dashboard/services/services.model';

interface IServiceState {
  loading: boolean;
  data?: IService;
  error?: string
}

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class ServicesSingleComponent implements OnInit {
  aboutData$!: Observable<IServiceState>
  services$!: Observable<IService[]>

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['title']){
        this.aboutData$ = this.servicesService.getByName$(params['title'])
        .pipe(
          map(res => {
            return { loading: false, data: res }
          }),
          startWith({ loading: true  }),
          catchError((error: string) => of({ loading: false, error }))
        )
      }
    })
    
    this.services$ = this.servicesService.services$
  }

}
