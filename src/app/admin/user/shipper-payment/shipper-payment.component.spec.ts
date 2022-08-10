import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperPaymentComponent } from './shipper-payment.component';

describe('ShipperPaymentComponent', () => {
  let component: ShipperPaymentComponent;
  let fixture: ComponentFixture<ShipperPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipperPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipperPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
