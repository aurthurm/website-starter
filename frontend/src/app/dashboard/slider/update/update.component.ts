import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IPostSimpleInfo } from 'src/app/shared/post-editor/post-editor.model';
import { SliderService } from '../services/service.service';

@Component({
  selector: 'dasboard-slider-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class SliderUpdateComponent implements OnInit {

  postInfo: IPostSimpleInfo = {
    post: undefined,
    config: {
      publishing: false,
      featurette: true,
      excerpt: false,
      divisions: []
    }
  };

  constructor(
    private sliderService: SliderService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['title']){
        this.sliderService.getByName$(params['title']).subscribe(
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

  slideSave(slide: any): void {
    if(slide.action === 'save'){

      const formData = new FormData();
      for (const key in slide.data) {
        if(key) formData.append(key, (slide.data as any)[key]);
      }

      this.sliderService.save$(formData).subscribe(
        res => { 
          this.postInfo = { ...this.postInfo, post: res }
        },
        error => { console.log("error: ", error) }
      )
    }
  }

}
