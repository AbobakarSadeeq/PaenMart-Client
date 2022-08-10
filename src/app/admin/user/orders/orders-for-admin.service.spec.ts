import { TestBed } from '@angular/core/testing';

import { OrdersForAdminService } from './orders-for-admin.service';

describe('OrdersForAdminService', () => {
  let service: OrdersForAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersForAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
