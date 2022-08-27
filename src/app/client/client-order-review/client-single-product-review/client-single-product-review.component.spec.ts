import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSingleProductReviewComponent } from './client-single-product-review.component';

describe('ClientSingleProductReviewComponent', () => {
  let component: ClientSingleProductReviewComponent;
  let fixture: ComponentFixture<ClientSingleProductReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSingleProductReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSingleProductReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
