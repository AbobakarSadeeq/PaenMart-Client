import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDiscountDealsComponent } from './product-discount-deals.component';

describe('ProductDiscountDealsComponent', () => {
  let component: ProductDiscountDealsComponent;
  let fixture: ComponentFixture<ProductDiscountDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDiscountDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDiscountDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
