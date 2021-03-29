import { TestBed } from '@angular/core/testing';

import { ProfGuardGuard } from './prof-guard.guard';

describe('ProfGuardGuard', () => {
  let guard: ProfGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
