import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';

import Swal from 'sweetalert2'

import { IPagedAppDataState } from 'src/app/shared/models/app-data';
import { IArticle } from '../article.model';
import { ArticleService } from '../service/article.service';
import { CategoriesService } from 'src/app/dashboard/categories/service/categories.service';
import { paginate } from 'src/app/shared/utils/pagination';
import { ICategory } from '../../categories/category.model';

@Component({
  selector: 'dashboard-article-listing',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  ITEMS_PER_PAGE = 15;
  categories$!: Observable<ICategory[]>;
  dataState$!: Observable<IPagedAppDataState<IArticle>>;
  private dataSubject = new BehaviorSubject<IPagedAppDataState<IArticle>>({} as any);

  filters = {
    title: "",
    category: "",
    status: "",
  }

  constructor(
    private articleService: ArticleService,
    private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fetchPage(0)
    this.categories$ = this.categoriesService.categories$
  }

  pagination = (page: number, total: number) => paginate(page, total)

  currentPage = (total: number, pageTotal: number) => Math.ceil(pageTotal / total)

  totalPages = (total: number, pageTotal: number) => Math.ceil(pageTotal / total)

  editArticle(article: IArticle) {
    this.router.navigate(['dashboard/articles', article?.slug]); // , { queryParams: { articleId: article?._id } }
  }

  filterArticles(): void {
    console.log(this.filters)
    this.dataState$ = this.articleService.filter$(this.filters)
    .pipe(
      map(res => {
        this.dataSubject.next({ loading: false, data: { results: res, total: res.length } });
        return { loading: false, data: { results: res, total: res.length, totalPages: res.length } }
      }),
      startWith({ loading: true } as any),
      catchError((error: any) => of({ loading:false, error }))
    )
  }

  publishArticle(article: IArticle): void {
    Swal.fire({
      title: 'Publish article',
      text: article.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, publish it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataState$ = this.articleService.publish$(article._id!)
        .pipe(
          map(res => {
            if(res._id && this.dataSubject.value.data?.results){
              const index = this.dataSubject.value.data?.results?.findIndex(item => item._id === res._id)!;
              if(index){
                this.dataSubject.value.data.results[index] = res;
              }
            }
            return { loading: false, data: this.dataSubject.value.data }
          }),
          startWith({ loading: false, data: this.dataSubject.value.data }),
          catchError((error: any) => of({ loading:false, error }))
        )
      }
    })
  }

  deleteArticle(article: IArticle): void {
    Swal.fire({
      title: 'Delete article',
      text: article.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataState$ = this.articleService.delete$(article._id!)
        .pipe(
          map(res => {
            if(res._id){
              const index = this.dataSubject.value.data?.results?.findIndex(item => item._id === res._id)!;
              this.dataSubject.value.data?.results?.splice(index, 1);
            }
            return { loading: false, data: this.dataSubject.value.data }
          }),
          startWith({ loading: false, data: this.dataSubject.value.data }),
          catchError((error: any) => of({ loading:false, error }))
        )
      }
    })
  }

  goToPage(page: number): void {
    this.fetchPage(page - 1)
  }

  fetchPage(page: number): void {
    this.dataState$ = this.articleService.articles$(page, this.ITEMS_PER_PAGE)
    .pipe(
      map(res => {
        this.dataSubject.next({ loading: false, data: { ...res } });
        return { loading: false, data: { ...res } }
      }),
      startWith({ loading: true }),
      catchError((error: string) => of({ loading: false, error }))
    )
  }

}
