import { TestBed } from '@angular/core/testing';

import { ShipperPaymentService } from './shipper-payment.service';

describe('ShipperPaymentService', () => {
  let service: ShipperPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipperPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
