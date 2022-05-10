import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentComponent } from './list/list-department.component';
import { UpdateDepartmentComponent } from './update/update-department.component';

const routes: Routes = [
  { 
   path: 'list',
   component: ListDepartmentComponent,
  },
  { 
    path: 'new',
    component: UpdateDepartmentComponent, 
  },
  { 
    path: ':title',
    component: UpdateDepartmentComponent, 
  },
  { path: '', redirectTo:'list', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
