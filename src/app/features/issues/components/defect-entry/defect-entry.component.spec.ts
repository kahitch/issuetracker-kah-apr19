import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectEntryComponent } from './defect-entry.component';

describe('DefectEntryComponent', () => {
  let component: DefectEntryComponent;
  let fixture: ComponentFixture<DefectEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
