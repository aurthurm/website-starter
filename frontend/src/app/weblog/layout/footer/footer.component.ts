import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { IArticle } from 'src/app/dashboard/articles/article.model';
import { ArticleService } from 'src/app/dashboard/articles/service/article.service';


interface IFooterNewsState {
  loading: boolean;
  articles?: IArticle[];
  error?: string
}


@Component({
  selector: 'app-weblog-layout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerNews$!: Observable<IFooterNewsState>;

  constructor(
    private articleService: ArticleService,    
  ) { }

  ngOnInit(): void {
    this.footerNews$ = this.articleService.articles$(0,3)
    .pipe(
      map(res => {

        return { loading: false, articles: res.results || [] }
      }),
      startWith({ loading: true, articles: [] }),
      catchError((error: string) => of({ loading: false, error }))
    )
  }

}
