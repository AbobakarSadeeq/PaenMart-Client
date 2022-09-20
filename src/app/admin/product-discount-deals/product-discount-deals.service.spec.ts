import { TestBed } from '@angular/core/testing';

import { ProductDiscountDealsService } from './product-discount-deals.service';

describe('ProductDiscountDealsService', () => {
  let service: ProductDiscountDealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDiscountDealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
