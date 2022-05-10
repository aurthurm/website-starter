import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInboxComponent } from './contact-inbox.component';

describe('ContactInboxComponent', () => {
  let component: ContactInboxComponent;
  let fixture: ComponentFixture<ContactInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
