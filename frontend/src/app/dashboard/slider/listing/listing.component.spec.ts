import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: SliderListingComponent;
  let fixture: ComponentFixture<SliderListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
