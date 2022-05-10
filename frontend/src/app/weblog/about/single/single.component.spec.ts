import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSingleComponent } from './single.component';

describe('SingleComponent', () => {
  let component: AboutSingleComponent;
  let fixture: ComponentFixture<AboutSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
