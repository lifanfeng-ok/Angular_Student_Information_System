import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentgradesComponent } from './studentgrades.component';

describe('StudentgradesComponent', () => {
  let component: StudentgradesComponent;
  let fixture: ComponentFixture<StudentgradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentgradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
