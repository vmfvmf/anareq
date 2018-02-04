import { TestBed, inject } from '@angular/core/testing';

import { PassoService } from './passo.service';

describe('PassoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassoService]
    });
  });

  it('should be created', inject([PassoService], (service: PassoService) => {
    expect(service).toBeTruthy();
  }));
});
