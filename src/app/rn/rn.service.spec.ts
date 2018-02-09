import { TestBed, inject } from '@angular/core/testing';

import { RnService } from './rn.service';

describe('RnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RnService]
    });
  });

  it('should be created', inject([RnService], (service: RnService) => {
    expect(service).toBeTruthy();
  }));
});
