import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { IArticle } from 'src/app/dashboard/articles/article.model';
import { ArticleService } from 'src/app/dashboard/articles/service/article.service';

interface IArticleState {
  loading: boolean;
  article?: IArticle;
  error?: string
}

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  articleData$!: Observable<IArticleState>

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    ) { 

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['slug']){
        this.articleData$ = this.articleService.getBySlug$(params['slug'])
        .pipe(
          map(res => {
            return { loading: false, article: res }
          }),
          startWith({ loading: true  }),
          catchError((error: string) => of({ loading: false, error }))
        )
      }
    })
  }

}
