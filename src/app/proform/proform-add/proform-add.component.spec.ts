import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformAddComponent } from './proform-add.component';

describe('ProformAddComponent', () => {
  let component: ProformAddComponent;
  let fixture: ComponentFixture<ProformAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProformAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
