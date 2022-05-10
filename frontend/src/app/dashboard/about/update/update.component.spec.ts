import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: AboutUpdateComponent;
  let fixture: ComponentFixture<AboutUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
