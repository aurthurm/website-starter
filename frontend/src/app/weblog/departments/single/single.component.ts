import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { IDepartment } from 'src/app/dashboard/department/department.model';
import { DepartmentService } from 'src/app/dashboard/department/service/department.service';

interface IDepartmentState {
  loading: boolean;
  data?: IDepartment;
  error?: string
}

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class DepartmentSingleComponent implements OnInit {
  aboutData$!: Observable<IDepartmentState>
  departments$!: Observable<IDepartment[]>

  constructor(
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['title']){
        this.aboutData$ = this.departmentService.getByName$(params['title'])
        .pipe(
          map(res => {
            return { loading: false, data: res }
          }),
          startWith({ loading: true  }),
          catchError((error: string) => of({ loading: false, error }))
        )
      }
    })

    this.departments$ = this.departmentService.departments$
  }
}
