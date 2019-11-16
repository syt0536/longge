import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDockingComponent } from './online-docking.component';

describe('OnlineDockingComponent', () => {
  let component: OnlineDockingComponent;
  let fixture: ComponentFixture<OnlineDockingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineDockingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineDockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
