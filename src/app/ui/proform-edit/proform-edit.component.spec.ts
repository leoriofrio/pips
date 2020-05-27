import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformEditComponent } from './proform-edit.component';

describe('ProformEditComponent', () => {
  let component: ProformEditComponent;
  let fixture: ComponentFixture<ProformEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProformEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
