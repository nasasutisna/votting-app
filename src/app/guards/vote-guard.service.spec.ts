import { TestBed } from '@angular/core/testing';

import { VoteGuardService } from './vote-guard.service';

describe('VoteGuardService', () => {
  let service: VoteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
