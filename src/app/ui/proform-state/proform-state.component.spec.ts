import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformStateComponent } from './proform-state.component';

describe('ProformStateComponent', () => {
  let component: ProformStateComponent;
  let fixture: ComponentFixture<ProformStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProformStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
