import { TestBed } from '@angular/core/testing';

import { AdminAccountBalanceService } from './admin-account-balance.service';

describe('AdminAccountBalanceService', () => {
  let service: AdminAccountBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAccountBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
