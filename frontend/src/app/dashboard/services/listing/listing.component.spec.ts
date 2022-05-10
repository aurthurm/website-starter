import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: ServicesListingComponent;
  let fixture: ComponentFixture<ServicesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
