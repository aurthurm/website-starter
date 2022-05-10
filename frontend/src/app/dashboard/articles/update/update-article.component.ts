import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IPostInfo } from 'src/app/shared/post-editor/post-editor.model';
import { FileStorageService } from 'src/app/shared/services/file-storage.service';
import { IArticle } from '../article.model';
import { ArticleService } from '../service/article.service';


@Component({
  selector: 'dashboard-article-update',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {
  postInfo: IPostInfo = {
    post: undefined,
    config: {
      excerpt: true,
      publishing: true,
      featurette: true,
      divisions: ['tags', 'category', 'department']
    }
  };

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['slug']){
        this.articleService.getBySlug$(params['slug']).subscribe(
          res => {
            this.postInfo = { ...this.postInfo, post: res };
          },
          error => {
            console.log("error ", error)
          }
        )
      }
    })
  }

  postEvent(eventData: any): void {
    if(eventData.action === 'save'){
      this.articleSave(eventData.data)
    }
    if(eventData.action === 'remove-image'){
      this.removeImage(eventData.data)
    }
  }

  articleSave(article: any): void {
    const formData = new FormData();
    for (const key in article) {
      formData.append(key, (article as any)[key]);
    }
    this.articleService.save$(formData).subscribe(
      res => { 
        this.postInfo = { ...this.postInfo, post: res }
      },
      error => { console.log("error: ", error) }
    )
  }

  removeImage(imageData: any): void {
    console.log("removeImage", imageData)
    this.articleService.removeFeaturedImage$(imageData.id, imageData.filepath).subscribe(res => {
      this.postInfo = { ...this.postInfo, post: res }
    })
  }

}
