import { TestBed } from '@angular/core/testing';

import { HrPageService } from './hr-page.service';

describe('HrPageService', () => {
  let service: HrPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
