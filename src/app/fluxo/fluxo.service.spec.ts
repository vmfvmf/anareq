import { TestBed, inject } from '@angular/core/testing';

import { FluxoService } from './fluxo.service';

describe('FluxoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FluxoService]
    });
  });

  it('should be created', inject([FluxoService], (service: FluxoService) => {
    expect(service).toBeTruthy();
  }));
});
