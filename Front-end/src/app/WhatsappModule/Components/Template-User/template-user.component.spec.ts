import { ComponentFixture, TestBed } from '@angular/core/testing';

import {WhatsappTemplateUserComponent } from './template-user.component';

describe('TemplateUserComponent', () => {
  let component: WhatsappTemplateUserComponent;
  let fixture: ComponentFixture<WhatsappTemplateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappTemplateUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappTemplateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
