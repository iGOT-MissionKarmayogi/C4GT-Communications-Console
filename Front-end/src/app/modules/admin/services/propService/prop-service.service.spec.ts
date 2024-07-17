import { TestBed } from '@angular/core/testing';

import { PropServiceService } from './prop-service.service';

describe('PropServiceService', () => {
  let service: PropServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
