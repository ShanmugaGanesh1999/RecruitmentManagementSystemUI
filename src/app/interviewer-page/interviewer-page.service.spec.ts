import { TestBed } from '@angular/core/testing';

import { InterviewerPageService } from './interviewer-page.service';

describe('InterviewerPageService', () => {
  let service: InterviewerPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewerPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
