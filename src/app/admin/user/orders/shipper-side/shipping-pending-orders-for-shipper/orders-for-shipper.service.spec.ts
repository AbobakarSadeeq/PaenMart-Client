import { TestBed } from '@angular/core/testing';

import { OrdersForShipperService } from './orders-for-shipper.service';

describe('OrdersForShipperService', () => {
  let service: OrdersForShipperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersForShipperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
