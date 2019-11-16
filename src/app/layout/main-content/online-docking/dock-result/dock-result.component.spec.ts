import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockResultComponent } from './dock-result.component';

describe('DockResultComponent', () => {
  let component: DockResultComponent;
  let fixture: ComponentFixture<DockResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
