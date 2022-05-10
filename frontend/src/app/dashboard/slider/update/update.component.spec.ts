import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: SliderUpdateComponent;
  let fixture: ComponentFixture<SliderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
