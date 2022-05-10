import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IAbout } from 'src/app/dashboard/about/about.model';
import { ICategory } from 'src/app/dashboard/categories/category.model';
import { CategoriesService } from 'src/app/dashboard/categories/service/categories.service';
import { IDepartment } from 'src/app/dashboard/department/department.model';
import { DepartmentService } from 'src/app/dashboard/department/service/department.service';
import { ServicesService } from 'src/app/dashboard/services/service/services.service';
import { IService } from 'src/app/dashboard/services/services.model';
import { AboutService } from '../../about/about.service';

@Component({
  selector: 'app-weblog-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  departments$!: Observable<IDepartment[]>
  abouts$!: Observable<IAbout[]>
  categories$!: Observable<ICategory[]>
  services$!: Observable<IService[]>

  constructor(
    private departmentService: DepartmentService,
    private aboutService: AboutService,
    private servicesService: ServicesService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.departments$ = this.departmentService.departments$
    this.abouts$ = this.aboutService.abouts$
    this.categories$ = this.categoriesService.categories$
    this.services$ = this.servicesService.services$
  }

}
