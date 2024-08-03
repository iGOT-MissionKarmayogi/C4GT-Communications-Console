import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTemplateComponent } from './create-new-template.component';

describe('CreateNewTemplateComponent', () => {
  let component: CreateNewTemplateComponent;
  let fixture: ComponentFixture<CreateNewTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
