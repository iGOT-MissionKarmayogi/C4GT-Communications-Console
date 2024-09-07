import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatsAppMenuComponent } from './whatsapp-menu.component';



describe('WhatsAppMenuComponent', () => {
  let component: WhatsAppMenuComponent;
  let fixture: ComponentFixture<WhatsAppMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsAppMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsAppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
