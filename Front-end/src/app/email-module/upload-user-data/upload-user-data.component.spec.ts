import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUserDataComponent } from './upload-user-data.component';

describe('UploadUserDataComponent', () => {
  let component: UploadUserDataComponent;
  let fixture: ComponentFixture<UploadUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadUserDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
