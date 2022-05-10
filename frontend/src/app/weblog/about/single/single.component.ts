import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { IAbout } from 'src/app/dashboard/about/about.model';
import { AboutService } from '../about.service';

interface IAboutState {
  loading: boolean;
  data?: IAbout;
  error?: string
}

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class AboutSingleComponent implements OnInit {
  abouts$!: Observable<IAbout[]>
  aboutData$!: Observable<IAboutState>
  currentAbout = ""

  constructor(
    private activatedRoute: ActivatedRoute,
    private aboutService: AboutService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['title']){
        this.currentAbout = params['title'];
        this.aboutData$ = this.aboutService.getByName$(params['title'])
        .pipe(
          map(res => {
            return { loading: false, data: res }
          }),
          startWith({ loading: true  }),
          catchError((error: string) => of({ loading: false, error }))
        )
      }
    })

    this.abouts$ = this.aboutService.abouts$
  }

  
}
