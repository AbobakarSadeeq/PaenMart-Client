import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrdersForAdminComponent } from './pending-orders-for-admin.component';

describe('PendingOrdersForAdminComponent', () => {
  let component: PendingOrdersForAdminComponent;
  let fixture: ComponentFixture<PendingOrdersForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingOrdersForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrdersForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
