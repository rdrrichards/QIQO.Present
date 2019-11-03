import { TestBed } from '@angular/core/testing';

import { ImgViewerService } from './img-viewer.service';

describe('ImgViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImgViewerService = TestBed.get(ImgViewerService);
    expect(service).toBeTruthy();
  });
});
