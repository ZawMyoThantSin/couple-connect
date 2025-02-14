import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canSetupAvatarGuard } from './can-setup-avatar.guard';

describe('canSetupAvatarGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canSetupAvatarGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
