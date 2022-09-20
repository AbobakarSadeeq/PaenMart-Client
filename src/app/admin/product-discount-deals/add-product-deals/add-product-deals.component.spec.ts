import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDealsComponent } from './add-product-deals.component';

describe('AddProductDealsComponent', () => {
  let component: AddProductDealsComponent;
  let fixture: ComponentFixture<AddProductDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
