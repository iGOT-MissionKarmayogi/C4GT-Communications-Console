import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserDataComponent } from './view-user-data.component';

describe('ViewUserDataComponent', () => {
  let component: ViewUserDataComponent;
  let fixture: ComponentFixture<ViewUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
