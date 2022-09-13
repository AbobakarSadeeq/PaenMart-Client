import { TestBed } from '@angular/core/testing';

import { SponsoredAdService } from './sponsored-ad.service';

describe('SponsoredAdService', () => {
  let service: SponsoredAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsoredAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
