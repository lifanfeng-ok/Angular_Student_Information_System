import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaedashboardComponent } from './gpaedashboard.component';

describe('GpaedashboardComponent', () => {
  let component: GpaedashboardComponent;
  let fixture: ComponentFixture<GpaedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpaedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpaedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
