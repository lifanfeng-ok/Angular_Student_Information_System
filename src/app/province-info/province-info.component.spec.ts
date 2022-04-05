import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceInfoComponent } from './province-info.component';

describe('ProvinceInfoComponent', () => {
  let component: ProvinceInfoComponent;
  let fixture: ComponentFixture<ProvinceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
