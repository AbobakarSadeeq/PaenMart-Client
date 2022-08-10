import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPendingOrdersForShipperComponent } from './shipping-pending-orders-for-shipper.component';

describe('ShippingPendingOrdersForShipperComponent', () => {
  let component: ShippingPendingOrdersForShipperComponent;
  let fixture: ComponentFixture<ShippingPendingOrdersForShipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingPendingOrdersForShipperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPendingOrdersForShipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
