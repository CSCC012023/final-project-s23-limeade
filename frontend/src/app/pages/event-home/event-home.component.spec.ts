import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHomeComponent } from './event-home.component';

describe('EventPageComponent', () => {
  let component: EventHomeComponent;
  let fixture: ComponentFixture<EventHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventHomeComponent],
    });
    fixture = TestBed.createComponent(EventHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
