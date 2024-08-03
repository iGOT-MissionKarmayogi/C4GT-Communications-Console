import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMenuComponent } from './email-menu.component';

describe('EmailMenuComponent', () => {
  let component: EmailMenuComponent;
  let fixture: ComponentFixture<EmailMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
