import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCreatorComponent } from './template-creator.component';

describe('TemplateCreatorComponent', () => {
  let component: TemplateCreatorComponent;
  let fixture: ComponentFixture<TemplateCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
