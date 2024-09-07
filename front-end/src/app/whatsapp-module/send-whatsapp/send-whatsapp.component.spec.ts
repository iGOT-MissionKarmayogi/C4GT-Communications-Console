import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendWhatsAppComponent } from './send-whatsapp.component';

describe('SendWhatsAppComponentt', () => {
  let component: SendWhatsAppComponent;
  let fixture: ComponentFixture<SendWhatsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendWhatsAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendWhatsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
