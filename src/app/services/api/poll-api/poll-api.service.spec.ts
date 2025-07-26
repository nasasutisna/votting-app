import { TestBed } from '@angular/core/testing';

import { PollApiService } from './poll-api.service';

describe('PollApiService', () => {
  let service: PollApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
