import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumSelectorComponent } from './medium-selector.component';

describe('MediumSelectorComponent', () => {
  let component: MediumSelectorComponent;
  let fixture: ComponentFixture<MediumSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediumSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
