import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestFilterFormComponent } from './interest-filter-form.component';

describe('InterestFilterFormComponent', () => {
  let component: InterestFilterFormComponent;
  let fixture: ComponentFixture<InterestFilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestFilterFormComponent]
    });
    fixture = TestBed.createComponent(InterestFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
