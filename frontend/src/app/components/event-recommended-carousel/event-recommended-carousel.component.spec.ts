import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRecommendedCarouselComponent } from './event-recommended-carousel.component';

describe('EventRecommendedCarouselComponent', () => {
  let component: EventRecommendedCarouselComponent;
  let fixture: ComponentFixture<EventRecommendedCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventRecommendedCarouselComponent]
    });
    fixture = TestBed.createComponent(EventRecommendedCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
