import { TestBed } from '@angular/core/testing';

import { GeneralPurposeService } from './general-purpose.service';

describe('GeneralPurposeService', () => {
  let service: GeneralPurposeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralPurposeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
