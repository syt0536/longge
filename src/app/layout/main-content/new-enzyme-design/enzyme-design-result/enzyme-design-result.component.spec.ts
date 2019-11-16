import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnzymeDesignResultComponent } from './enzyme-design-result.component';

describe('EnzymeDesignResultComponent', () => {
  let component: EnzymeDesignResultComponent;
  let fixture: ComponentFixture<EnzymeDesignResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnzymeDesignResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnzymeDesignResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
