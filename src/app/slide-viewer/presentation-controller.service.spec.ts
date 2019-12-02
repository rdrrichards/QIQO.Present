import { TestBed } from '@angular/core/testing';

import { PresentationControllerService } from './presentation-controller.service';

describe('PresentationControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentationControllerService = TestBed.get(PresentationControllerService);
    expect(service).toBeTruthy();
  });
});
