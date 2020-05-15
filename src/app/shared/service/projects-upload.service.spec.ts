import { TestBed } from '@angular/core/testing';

import { ProjectsUploadService } from './projects-upload.service';

describe('ProjectsUploadService', () => {
  let service: ProjectsUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
