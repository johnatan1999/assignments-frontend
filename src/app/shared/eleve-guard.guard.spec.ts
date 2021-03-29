import { TestBed } from '@angular/core/testing';

import { EleveGuardGuard } from './eleve-guard.guard';

describe('EleveGuardGuard', () => {
  let guard: EleveGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EleveGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
