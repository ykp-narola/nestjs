import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

// Mock jwks-rsa to prevent Jest ESM parsing issues from transitive import in guard
jest.mock('jwks-rsa', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getSigningKey: jest.fn(),
    };
  });
});

describe('UserController', () => {
  let controller: UserController;
  let mockUserService = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    getUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    searchUsers: jest.fn(),
  };
  let mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

