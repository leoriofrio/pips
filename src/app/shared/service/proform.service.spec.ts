import { TestBed } from '@angular/core/testing';

import { ProformService } from './proform.service';

describe('ProformService', () => {
  let service: ProformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
