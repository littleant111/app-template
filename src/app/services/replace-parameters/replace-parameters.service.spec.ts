import { TestBed } from '@angular/core/testing';

import { ReplaceParametersService } from './replace-parameters.service';

describe('ReplaceParametersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReplaceParametersService = TestBed.get(ReplaceParametersService);
    expect(service).toBeTruthy();
  });
});
