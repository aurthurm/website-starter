import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IPostSimple, IPostSimpleInfo } from 'src/app/shared/post-editor/post-editor.model';
import { DepartmentService } from '../service/department.service';


@Component({
  selector: 'dashboard-department-update',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentComponent implements OnInit {
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
    private departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['title']){
        this.departmentService.getByName$(params['title']).subscribe(
          res => {
            this.postInfo = { ...this.postInfo, post: res as IPostSimple };
          },
          error => {
            console.log("error ", error)
          }
        )
      }
    })
  }

  departmentSave(department: any): void {
    if(department.action === 'save'){
      this.departmentService.save$(department?.data).subscribe(
        res => { 
          this.postInfo = { ...this.postInfo, post: res as IPostSimple }
        },
        error => { console.log("error: ", error) }
      )
    }
  }

}
