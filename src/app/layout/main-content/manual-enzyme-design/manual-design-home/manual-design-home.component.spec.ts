import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDesignHomeComponent } from './manual-design-home.component';

describe('ManualDesignHomeComponent', () => {
  let component: ManualDesignHomeComponent;
  let fixture: ComponentFixture<ManualDesignHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualDesignHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDesignHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
