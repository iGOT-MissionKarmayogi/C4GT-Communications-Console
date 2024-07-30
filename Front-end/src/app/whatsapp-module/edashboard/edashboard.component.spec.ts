import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  EdashboardWhatsAppComponent } from './edashboard.component';

describe(' EdashboardWhatsAppComponent', () => {
  let component:  EdashboardWhatsAppComponent;
  let fixture: ComponentFixture< EdashboardWhatsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EdashboardWhatsAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent( EdashboardWhatsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
