import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrderReviewComponent } from './client-order-review.component';

describe('ClientOrderReviewComponent', () => {
  let component: ClientOrderReviewComponent;
  let fixture: ComponentFixture<ClientOrderReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientOrderReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOrderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
