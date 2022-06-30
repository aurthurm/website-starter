import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';

import { IArticle } from 'src/app/dashboard/articles/article.model';
import { ArticleService } from 'src/app/dashboard/articles/service/article.service';
import { ServicesService } from 'src/app/dashboard/services/service/services.service';
import { IService } from 'src/app/dashboard/services/services.model';
import { SliderService } from 'src/app/dashboard/slider/services/service.service';
import { ISlide } from 'src/app/dashboard/slider/slider.model';
import { environment } from 'src/environments/environment';

interface IHomeNewsState {
    loading: boolean;
    articles?: IArticle[];
    error?: string
}

interface IHomeServicesState {
  loading: boolean;
  data?: IService[];
  error?: string
}

interface ICarouselState {
  loading: boolean;
  data?: ISlide[];
  error?: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  BACKEND_API_URL = environment.BACKEND_API_URL;

  homeServices$!: Observable<IHomeServicesState>;
  homeNewsUpdate$!: Observable<IHomeNewsState>;
  slides$!: Observable<ICarouselState>;

  constructor(
      private articleService: ArticleService,
      private servicesService: ServicesService,
      private sliderService: SliderService,
  ) { }

  ngOnInit(): void {
    this.slides$ = this.sliderService.slides$
    .pipe(
      map(res => {
        return { loading: false, data: res || [] }
      }),
      startWith({ loading: true, articles: [] }),
      catchError((error: string) => of({ loading: false, error }))
    )
    
    this.homeServices$ = this.servicesService.services$
    .pipe(
      map(res => {
        return { loading: false, data: res || [] }
      }),
      startWith({ loading: true, data: [] }),
      catchError((error: string) => of({ loading: false, error }))
    )
    
    this.homeNewsUpdate$ = this.articleService.articles$(0,5)
    .pipe(
      map(res => {
        return { loading: false, articles: res.results || [] }
      }),
      startWith({ loading: true, articles: [] }),
      catchError((error: string) => of({ loading: false, error }))
    )
  }
}
