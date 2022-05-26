import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/dashboard/categories/service/categories.service';
import { DepartmentService } from 'src/app/dashboard/department/service/department.service';
import { TagsService } from 'src/app/dashboard/tags/service/tags.service';
import { IPost, IPostInfo, IPostSimple } from './post-editor.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit, OnChanges {
  BACKEND_API_URL = environment.BACKEND_API_URL;
  @Output() public postOut = new EventEmitter<any>();
  @Input() public postInfoIn!: IPostInfo;
  preloader = true;

  divisions = {
    departments: [] as IPostSimple[],
    tags: [] as IPostSimple[],
    categories: [] as IPostSimple[],
  }
  editorConfig: any = {};
  savingAction = false;

  file: any;
  articleForm = new FormGroup({
    _id: new FormControl(),
    title: new FormControl('', Validators.required),
    content: new FormControl({ value: "Begin typing ...", disabled: false }, Validators.required),
    category: new FormControl(),
    tags: new FormArray([]),
    department: new FormControl(),
    excerpt: new FormControl(),
    featuredImage: new FormControl(),
    file: new FormControl(),
  });

  constructor(
    private tagsService: TagsService,
    private categoriesService: CategoriesService,
    private departmentService: DepartmentService,
  ) { }

  ngOnInit(): void {
    this.initEditorConfig()
  }

  ngOnChanges(changes: SimpleChanges) {
    const postInfoIn = changes['postInfoIn'].currentValue
    if(postInfoIn?.post){
      this.updateForm({ ...postInfoIn.post })
    }
    setTimeout(() => {
      this.savingAction = false;
      this.articleForm.enable();
    }, 1000)

    this.initDependencies(postInfoIn)
  }

  initDependencies(postInfoIn: IPostInfo) {
    if(postInfoIn.config?.divisions?.includes('department') === true && this.divisions.departments?.length == 0){
      this.departmentService.departments$.subscribe(res => this.divisions.departments = res as IPostSimple[]);
    }
    if(postInfoIn.config?.divisions?.includes('tags') === true && this.divisions.tags?.length == 0){
      this.tagsService.tags$.subscribe(res => this.divisions.tags = res as IPostSimple[]);
    }
    if(postInfoIn.config?.divisions?.includes('category') === true && this.divisions.categories?.length == 0){
      this.categoriesService.categories$.subscribe(res => this.divisions.categories = res as IPostSimple[]);
    }
  }

  initEditorConfig(): void {
    this.editorConfig = {	
      height: '700',
      base_url: '/tinymce',
      suffix: '.min',
      menubar: 'file edit view format insert tools table help',
      menu: {
        insert: {
          title: 'Insert',
          items: 'image link media inserttable | charmap | anchor | insertdatetime | assessment participant program rater'
        }
      },
      toolbar: 'save undo redo | styleselect | formatselect | properties | bold italic strikethrough forecolor backcolor fontsizeselect | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      plugins: [
        'image', 'code', 'autolink', 'advlist', 'lists', 'link', 'charmap', 'preview', 'anchor', 'save',
        'searchreplace', 'visualblocks', 'code', 'fullscreen', 'wordcount', 'pagebreak', 'nonbreaking',
        'insertdatetime', 'media', 'table', 'code', 'help', 'directionality', 'wordcount', 
      ],
      images_upload_url: this.BACKEND_API_URL + '/file-storage/upload-one',
      content_css: "document",
      save_enablewhendirty: true,
      save_onsavecallback: function () { 
        // dont remove in order to prevent editor reload
        // using event onSaveContent: 
        // however if the event isnt firing write the logic to save data inside this callback. 
        // However you might want to handle Article title save on its own too
      },
    }
  }

  editorSave(): void {
    this.postOut.emit({ 
      action: "save",
      data: { ...this.articleForm.value, file: this.file }
     })
    this.savingAction = true;
    this.articleForm.disable();
  }

  removeImage(event: any, id: string,filepath: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.postOut.emit({ 
      action: "remove-image",
      data: { id, filepath }
     })
    this.file = undefined;
  }

  updateForm(post: IPost): void {
    this.articleForm.patchValue({
      _id: post?._id,
      title: post?.title,
      content: post?.content,
      category: post?.category,
      department: post?.department,
      featuredImage: post?.featuredImage ?? "",
      tags: post?.tags,
    });
  }

  hasDivisions(): boolean {
    if(this.postInfoIn.config?.divisions) {
      return this.postInfoIn.config?.divisions.length > 0;
    }
    return false
  }

  handleFileUpload(event: any): void {
    this.file = event.target.files[0]
    console.log(this.file)
  }
}