import { TestBed } from '@angular/core/testing';

import { PresentationReceiverService } from './presentation-receiver.service';

describe('PresentationReceiverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentationReceiverService = TestBed.get(PresentationReceiverService);
    expect(service).toBeTruthy();
  });
});
