import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradedashboardComponent } from './gradedashboard.component';

describe('GradedashboardComponent', () => {
  let component: GradedashboardComponent;
  let fixture: ComponentFixture<GradedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
