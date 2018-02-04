import { TestBed, inject } from '@angular/core/testing';

import { DbbaseService } from './dbbase.service';

describe('DbbaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbbaseService]
    });
  });

  it('should be created', inject([DbbaseService], (service: DbbaseService) => {
    expect(service).toBeTruthy();
  }));
});
