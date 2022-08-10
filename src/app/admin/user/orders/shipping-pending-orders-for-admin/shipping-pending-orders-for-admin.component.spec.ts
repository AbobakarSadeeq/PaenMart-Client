import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPendingOrdersForAdminComponent } from './shipping-pending-orders-for-admin.component';

describe('ShippingPendingOrdersForAdminComponent', () => {
  let component: ShippingPendingOrdersForAdminComponent;
  let fixture: ComponentFixture<ShippingPendingOrdersForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingPendingOrdersForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPendingOrdersForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
