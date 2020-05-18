import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitsFormComponent } from './chits-form.component';

describe('ChitsFormComponent', () => {
  let component: ChitsFormComponent;
  let fixture: ComponentFixture<ChitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
