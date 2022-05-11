import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { IArticle } from 'src/app/dashboard/articles/article.model';
import { ArticleService } from 'src/app/dashboard/articles/service/article.service';
import { environment } from 'src/environments/environment';

interface IArticleState {
  loading: boolean;
  articles?: IArticle[];
  error?: string
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  BACKEND_API_URL = environment.BACKEND_API_URL;
  articleState$!: Observable<IArticleState>;

  constructor(
      private articleService: ArticleService,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.articleState$ = this.articleService.articles$(0, 20, params!)
      .pipe(
        map(res => {
          return { loading: false, articles: res.results || [] }
        }),
        startWith({ loading: true, articles: [] }),
        catchError((error: string) => of({ loading: false, error }))
      )
    })
  }

}
