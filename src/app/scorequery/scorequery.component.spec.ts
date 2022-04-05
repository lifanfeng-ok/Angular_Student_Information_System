import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorequeryComponent } from './scorequery.component';

describe('ScorequeryComponent', () => {
  let component: ScorequeryComponent;
  let fixture: ComponentFixture<ScorequeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorequeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorequeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
