import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProductDiscountDealComponent } from './client-product-discount-deal.component';

describe('ClientProductDiscountDealComponent', () => {
  let component: ClientProductDiscountDealComponent;
  let fixture: ComponentFixture<ClientProductDiscountDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProductDiscountDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProductDiscountDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
