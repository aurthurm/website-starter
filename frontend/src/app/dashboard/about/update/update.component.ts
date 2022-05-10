import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPostSimple, IPostSimpleInfo } from 'src/app/shared/post-editor/post-editor.model';
import { AboutService } from '../service/about.service';

@Component({
  selector: 'dashboard-about-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class AboutUpdateComponent implements OnInit {

  postInfo: IPostSimpleInfo = {
    post: {} as IPostSimple,
    config: {
      publishing: false,
      featurette: true,
      excerpt: false,
      divisions: []
    }
  };

  constructor(
    private aboutService: AboutService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params)
      if(params['title']){
        this.aboutService.getByName$(params['title']).subscribe(
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

  aboutSave(about: any): void {
    if(about.action === 'save'){
      this.aboutService.save$(about?.data).subscribe(
        res => { 
          this.postInfo = { ...this.postInfo, post: res }
        },
        error => { console.log("error: ", error) }
      )
    }
  }
}
