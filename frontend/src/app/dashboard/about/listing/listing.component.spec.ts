import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: AboutListingComponent;
  let fixture: ComponentFixture<AboutListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
