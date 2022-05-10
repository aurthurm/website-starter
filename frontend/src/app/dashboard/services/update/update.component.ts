import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPostInfo } from 'src/app/shared/post-editor/post-editor.model';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'dashboard-services-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class ServicesUpdateComponent implements OnInit {

  postInfo: IPostInfo = {
    post: undefined,
    config: {
      publishing: false,
      featurette: true,
      excerpt: false,
      divisions: []
    }
  };

  constructor(
    private servicesService: ServicesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['title']){
        this.servicesService.getByName$(params['title']).subscribe(
          res => {
            this.postInfo = { ...this.postInfo, post: { ...res } };
          },
          error => {
            console.log("error ", error)
          }
        )
      }
    })
  }

  serviceSave(service: any): void {
    if(service.action === 'save'){
      this.servicesService.save$(service?.data).subscribe(
        res => { 
          this.postInfo = { ...this.postInfo, post: { ...res } }
        },
        error => { console.log("error: ", error) }
      )
    }
  }

}
