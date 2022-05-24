import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() 
  gallery:any[] =[];
  selected_img:any[] =[];

  @Output()
  close = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  selectImage(src:string){
    this.selected_img.push(src);
  }

  isSelected(src:string):boolean{
   return this.selected_img.includes(src);
  }

  closeGallery(){
    this.close.emit(this.selected_img);
  }

}
