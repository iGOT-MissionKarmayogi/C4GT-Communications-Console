import { ComponentFixture, TestBed } from '@angular/core/testing';

import {CreateWhatsAppTemplateComponent } from './create-template.component';

describe('CreateWhatsappTemplateComponent', () => {
  let component: CreateWhatsAppTemplateComponent;
  let fixture: ComponentFixture<CreateWhatsAppTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWhatsAppTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWhatsAppTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
