import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFiveResultComponent } from './step-five-result.component';

describe('StepFiveResultComponent', () => {
  let component: StepFiveResultComponent;
  let fixture: ComponentFixture<StepFiveResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepFiveResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFiveResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
