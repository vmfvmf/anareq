import { TestBed, inject } from '@angular/core/testing';

import { CasousoService } from './casouso.service';

describe('CasousoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasousoService]
    });
  });

  it('should be created', inject([CasousoService], (service: CasousoService) => {
    expect(service).toBeTruthy();
  }));
});
