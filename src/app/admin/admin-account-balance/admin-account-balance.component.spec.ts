import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountBalanceComponent } from './admin-account-balance.component';

describe('AdminAccountBalanceComponent', () => {
  let component: AdminAccountBalanceComponent;
  let fixture: ComponentFixture<AdminAccountBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAccountBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
