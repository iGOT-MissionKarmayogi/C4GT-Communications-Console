import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWhatsappUserDataComponent } from './upload-user-data.component';

describe('UploadWhatsappUserDataComponent', () => {
  let component: UploadWhatsappUserDataComponent;
  let fixture: ComponentFixture<UploadWhatsappUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadWhatsappUserDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadWhatsappUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
