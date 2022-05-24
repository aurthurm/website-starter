import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { IArticle } from 'src/app/dashboard/articles/article.model';
import { ArticleService } from 'src/app/dashboard/articles/service/article.service';
import { ICategory } from 'src/app/dashboard/categories/category.model';
import { CategoriesService } from 'src/app/dashboard/categories/service/categories.service';

interface IArticleState {
  loading: boolean;
  article?: IArticle;
  articles?: IArticle[];
  error?: string
}

interface ICategoryState {
  loading: boolean;
  data?: ICategory[];
  error?: string
}

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  articleData$!: Observable<IArticleState>
  asideNews$!: Observable<IArticleState>;
  categories$!: Observable<ICategoryState>;
  excludeId = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['slug']){
        this.articleData$ = this.articleService.getBySlug$(params['slug'])
        .pipe(
          map(res => {
            this.excludeId = res._id;
            return { loading: false, article: res }
          }),
          startWith({ loading: true  }),
          catchError((error: string) => of({ loading: false, error }))
        )
      }
    })

    this.asideNews$ = this.articleService.articles$(0,6)
    .pipe(
      map(res => {
        const data = res.results?.filter(x => x._id !== this.excludeId);
        return { loading: false, articles: data || [] }
      }),
      startWith({ loading: true, articles: [] }),
      catchError((error: string) => of({ loading: false, error }))
    )

    this.categories$ = this.categoryService.categories$
    .pipe(
      map(res => {
        return { loading: false, data: res || [] }
      }),
      startWith({ loading: true, data: [] }),
      catchError((error: string) => of({ loading: false, error }))
    )

  }

}
