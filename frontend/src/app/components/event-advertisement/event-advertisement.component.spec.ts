import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAdvertisementComponent } from './event-advertisement.component';

describe('EventAdvertisementComponent', () => {
  let component: EventAdvertisementComponent;
  let fixture: ComponentFixture<EventAdvertisementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventAdvertisementComponent]
    });
    fixture = TestBed.createComponent(EventAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
