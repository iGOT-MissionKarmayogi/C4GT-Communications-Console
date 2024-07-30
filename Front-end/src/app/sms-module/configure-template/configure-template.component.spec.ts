import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTemplateComponent } from './configure-template.component';

describe('ConfigureTemplateComponent', () => {
  let component: ConfigureTemplateComponent;
  let fixture: ComponentFixture<ConfigureTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
