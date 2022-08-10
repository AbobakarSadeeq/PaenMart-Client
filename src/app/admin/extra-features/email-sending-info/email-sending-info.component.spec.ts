import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSendingInfoComponent } from './email-sending-info.component';

describe('EmailSendingInfoComponent', () => {
  let component: EmailSendingInfoComponent;
  let fixture: ComponentFixture<EmailSendingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSendingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSendingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
