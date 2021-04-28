import { TestBed } from '@angular/core/testing';

import { UpdateInterviewService } from './update-interview.service';

describe('UpdateInterviewService', () => {
  let service: UpdateInterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateInterviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
