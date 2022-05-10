import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';

import Swal from 'sweetalert2'

import { IAppData, IAppDataState } from 'src/app/shared/models/app-data';
import { IDepartment } from '../department.model';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'dashboard-department-listing',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss']
})
export class ListDepartmentComponent implements OnInit {

  dataState$!: Observable<IAppDataState<IDepartment>>;
  private dataSubject = new BehaviorSubject<IAppData<IDepartment>>({} as any);

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataState$ = this.departmentService.departments$
    .pipe(
      map(res => {
        this.dataSubject.next({ items: res })
        return { loading: false, data: { items: res } }
      }),
      startWith({ loading: true }),
      catchError((error: string) => of({ loading: false, error }))
    )
  }

  editDepartment(department: IDepartment) {
    this.router.navigate(['dashboard/departments', department?.title]);
  }

  filterDepartments(event: any): void {
    this.dataState$ = this.departmentService.filter$(event.target.value, this.dataSubject.value.items || [])
    .pipe(
      map(res => {
        return { loading: false, data: { items: res } }
      }),
      startWith({ loading: false, data: this.dataSubject.value }),
      catchError((error: any) => of({ loading:false, error }))
    )
  }

  deleteDepartment(department: IDepartment): void {
    Swal.fire({
      title: 'Delete department',
      text: department.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataState$ = this.departmentService.delete$(department._id!)
        .pipe(
          map(res => {
            if(res._id){
              const index = this.dataSubject.value?.items?.findIndex(item => item._id === res._id)!;
              this.dataSubject.value.items?.splice(index, 1);
            }
            return { loading: false, data: this.dataSubject.value }
          }),
          startWith({ loading: false, data: this.dataSubject.value }),
          catchError((error: any) => of({ loading:false, error }))
        )
      }
    })
  }

}