import { TestBed } from '@angular/core/testing';

import { WhatsappServiceService } from './whatsapp-service.service';

describe('WhatsappServiceService', () => {
  let service: WhatsappServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsappServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
