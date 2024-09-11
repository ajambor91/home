import {TestBed} from '@angular/core/testing';

import {AdamantumApiReqsService} from '../adamantum-api-reqs.service';

describe('AdamantumApiReqsService', () => {
  let service: AdamantumApiReqsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdamantumApiReqsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
