import { TestBed } from '@angular/core/testing';

import { ExcelImportService } from './import-excel.service';

describe('ImportExcelService', () => {
  let service: ExcelImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
