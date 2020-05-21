import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformListComponent } from './proform-list.component';

describe('ProformListComponent', () => {
  let component: ProformListComponent;
  let fixture: ComponentFixture<ProformListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProformListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
