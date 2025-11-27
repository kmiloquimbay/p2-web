import { TokenGuardGuard } from './token-guard.guard';

describe('TokenGuardGuard', () => {
  it('should be defined', () => {
    // provide a mock repository instance for the constructor
    expect(new TokenGuardGuard({} as any)).toBeDefined();
  });
});
