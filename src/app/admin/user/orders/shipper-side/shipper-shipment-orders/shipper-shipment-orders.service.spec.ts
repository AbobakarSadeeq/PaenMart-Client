import { TestBed } from '@angular/core/testing';

import { ShipperShipmentOrdersService } from './shipper-shipment-orders.service';

describe('ShipperShipmentOrdersService', () => {
  let service: ShipperShipmentOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipperShipmentOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
