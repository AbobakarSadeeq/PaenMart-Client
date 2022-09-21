import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductDealsComponent } from './update-product-deals.component';

describe('UpdateProductDealsComponent', () => {
  let component: UpdateProductDealsComponent;
  let fixture: ComponentFixture<UpdateProductDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
