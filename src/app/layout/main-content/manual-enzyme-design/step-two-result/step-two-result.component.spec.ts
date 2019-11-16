import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwoResultComponent } from './step-two-result.component';

describe('StepTwoResultComponent', () => {
  let component: StepTwoResultComponent;
  let fixture: ComponentFixture<StepTwoResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTwoResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
