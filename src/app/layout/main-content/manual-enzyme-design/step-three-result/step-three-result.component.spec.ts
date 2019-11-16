import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepThreeResultComponent } from './step-three-result.component';

describe('StepThreeResultComponent', () => {
  let component: StepThreeResultComponent;
  let fixture: ComponentFixture<StepThreeResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepThreeResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepThreeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
