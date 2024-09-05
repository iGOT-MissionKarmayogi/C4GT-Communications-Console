import { TestBed } from '@angular/core/testing';

import { CreateTemplateService } from './create-template.service';

describe('CreateTemplateService', () => {
  let service: CreateTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
