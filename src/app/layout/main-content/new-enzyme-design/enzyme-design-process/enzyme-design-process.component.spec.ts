import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnzymeDesignProcessComponent } from './enzyme-design-process.component';

describe('EnzymeDesignProcessComponent', () => {
  let component: EnzymeDesignProcessComponent;
  let fixture: ComponentFixture<EnzymeDesignProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnzymeDesignProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnzymeDesignProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
