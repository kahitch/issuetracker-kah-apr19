import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorheaderComponent } from './errorheader.component';

describe('ErrorheaderComponent', () => {
  let component: ErrorheaderComponent;
  let fixture: ComponentFixture<ErrorheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
