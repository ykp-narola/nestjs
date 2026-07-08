import { SupabaseAuthGuard } from './supabase-auth.guard';
import { ConfigService } from '@nestjs/config';

jest.mock('jwks-rsa', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getSigningKey: jest.fn().mockResolvedValue({
        getPublicKey: () => 'mock-public-key',
      }),
    };
  });
});

describe('SupabaseAuthGuard', () => {
  let guard: SupabaseAuthGuard;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(() => {
    mockConfigService = {
      get: jest.fn().mockReturnValue('mock-secret'),
    };
    guard = new SupabaseAuthGuard(mockConfigService as ConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});

