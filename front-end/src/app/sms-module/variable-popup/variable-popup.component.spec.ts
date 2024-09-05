import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablePopupComponent } from './variable-popup.component';

describe('VariablePopupComponent', () => {
  let component: VariablePopupComponent;
  let fixture: ComponentFixture<VariablePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariablePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
