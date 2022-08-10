import { TestBed } from '@angular/core/testing';

import { BrandWithNestCategoryService } from './brand-with-nest-category.service';

describe('BrandWithNestCategoryService', () => {
  let service: BrandWithNestCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandWithNestCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
