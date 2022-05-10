import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesSingleComponent } from './single.component';

describe('SingleComponent', () => {
  let component: ServicesSingleComponent;
  let fixture: ComponentFixture<ServicesSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
