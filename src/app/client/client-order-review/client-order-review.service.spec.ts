import { TestBed } from '@angular/core/testing';

import { ClientOrderReviewService } from './client-order-review.service';

describe('ClientOrderReviewService', () => {
  let service: ClientOrderReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientOrderReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
