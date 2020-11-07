import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformCheckComponent } from './proform-check.component';

describe('ProformCheckComponent', () => {
  let component: ProformCheckComponent;
  let fixture: ComponentFixture<ProformCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProformCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
