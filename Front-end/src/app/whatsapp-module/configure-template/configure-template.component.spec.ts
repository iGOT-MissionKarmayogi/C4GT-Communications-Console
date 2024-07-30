import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureWhatsAppTemplateComponent } from './configure-template.component';

describe('ConfigureWhatsAppTemplateComponent', () => {
  let component: ConfigureWhatsAppTemplateComponent;
  let fixture: ComponentFixture<ConfigureWhatsAppTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureWhatsAppTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureWhatsAppTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
