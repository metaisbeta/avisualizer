import { TestBed } from '@angular/core/testing';

import { AvisualizerService } from './avisualizer.service';

describe('AvisualizerService', () => {
  let service: AvisualizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisualizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
