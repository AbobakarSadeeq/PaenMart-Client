import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperShipmentOrdersComponent } from './shipper-shipment-orders.component';

describe('ShipperShipmentOrdersComponent', () => {
  let component: ShipperShipmentOrdersComponent;
  let fixture: ComponentFixture<ShipperShipmentOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipperShipmentOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipperShipmentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
