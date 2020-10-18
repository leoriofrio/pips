import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformOptionsStateComponent } from './proform-options-state.component';

describe('ProformOptionsStateComponent', () => {
  let component: ProformOptionsStateComponent;
  let fixture: ComponentFixture<ProformOptionsStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProformOptionsStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformOptionsStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
