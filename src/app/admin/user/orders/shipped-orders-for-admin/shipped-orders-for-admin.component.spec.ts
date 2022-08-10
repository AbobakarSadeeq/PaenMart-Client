import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedOrdersForAdminComponent } from './shipped-orders-for-admin.component';

describe('ShippedOrdersForAdminComponent', () => {
  let component: ShippedOrdersForAdminComponent;
  let fixture: ComponentFixture<ShippedOrdersForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippedOrdersForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedOrdersForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
