import { TestBed } from '@angular/core/testing';

import { ViewcandidateService } from './viewcandidate.service';

describe('ViewcandidateService', () => {
  let service: ViewcandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewcandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
