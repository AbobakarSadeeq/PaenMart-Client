import { TestBed } from '@angular/core/testing';

import { ExtraFeaturesService } from './extra-features.service';

describe('ExtraFeaturesService', () => {
  let service: ExtraFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
