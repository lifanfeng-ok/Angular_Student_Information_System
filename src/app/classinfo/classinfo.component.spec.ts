import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassinfoComponent } from './classinfo.component';

describe('ClassinfoComponent', () => {
  let component: ClassinfoComponent;
  let fixture: ComponentFixture<ClassinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
