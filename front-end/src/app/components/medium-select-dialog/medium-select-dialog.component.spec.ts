import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumSelectDialogComponent } from './medium-select-dialog.component';

describe('MediumSelectDialogComponent', () => {
  let component: MediumSelectDialogComponent;
  let fixture: ComponentFixture<MediumSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediumSelectDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
