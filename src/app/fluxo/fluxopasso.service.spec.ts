import { TestBed, inject } from '@angular/core/testing';

import { FluxopassoService } from './fluxopasso.service';

describe('PassoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FluxopassoService]
    });
  });

  it('should be created', inject([FluxopassoService], (service: FluxopassoService) => {
    expect(service).toBeTruthy();
  }));
});
