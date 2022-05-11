import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPost } from '../post-editor/post-editor.model';

@Component({
  selector: 'weblog-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  BACKEND_API_URL = environment.BACKEND_API_URL;
  @Input() postData!: IPost | any;

  constructor() { }

  ngOnInit(): void {
  }

}
