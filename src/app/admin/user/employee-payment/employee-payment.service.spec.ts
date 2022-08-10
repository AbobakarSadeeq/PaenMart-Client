import { TestBed } from '@angular/core/testing';

import { EmployeePaymentService } from './employee-payment.service';

describe('EmployeePaymentService', () => {
  let service: EmployeePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
