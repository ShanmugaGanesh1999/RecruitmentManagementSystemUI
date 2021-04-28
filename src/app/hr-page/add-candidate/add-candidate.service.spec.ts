import { TestBed } from '@angular/core/testing';

import { AddCandidateService } from '../add-candidate/add-candidate.service';

describe('AddCandidateService', () => {
  let service: AddCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
