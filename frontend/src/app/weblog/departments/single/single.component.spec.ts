import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSingleComponent } from './single.component';

describe('SingleComponent', () => {
  let component: DepartmentSingleComponent;
  let fixture: ComponentFixture<DepartmentSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
