import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrdersForAdminComponent } from './cancel-orders-for-admin.component';

describe('CancelOrdersForAdminComponent', () => {
  let component: CancelOrdersForAdminComponent;
  let fixture: ComponentFixture<CancelOrdersForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelOrdersForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrdersForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
