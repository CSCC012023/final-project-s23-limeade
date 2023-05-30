import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvcDemoComponent } from './mvc-demo.component';

describe('MvcDemoComponent', () => {
  let component: MvcDemoComponent;
  let fixture: ComponentFixture<MvcDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MvcDemoComponent]
    });
    fixture = TestBed.createComponent(MvcDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
