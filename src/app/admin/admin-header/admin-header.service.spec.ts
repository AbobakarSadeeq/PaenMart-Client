import { TestBed } from '@angular/core/testing';

import { AdminHeaderService } from './admin-header.service';

describe('AdminHeaderService', () => {
  let service: AdminHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
