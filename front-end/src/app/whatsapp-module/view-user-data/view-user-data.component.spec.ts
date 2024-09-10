import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWhatsAppUserDataComponent } from './view-user-data.component';

describe('ViewWhatsAppUserDataComponent', () => {
  let component: ViewWhatsAppUserDataComponent;
  let fixture: ComponentFixture<ViewWhatsAppUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWhatsAppUserDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWhatsAppUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
