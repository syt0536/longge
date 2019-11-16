import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOneResultComponent } from './step-one-result.component';

describe('StepOneResultComponent', () => {
  let component: StepOneResultComponent;
  let fixture: ComponentFixture<StepOneResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepOneResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
