import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappTemplateSelectorComponent } from './template-selector.component';

describe('TemplateSelectorComponent', () => {
  let component: WhatsappTemplateSelectorComponent;
  let fixture: ComponentFixture<WhatsappTemplateSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappTemplateSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappTemplateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
