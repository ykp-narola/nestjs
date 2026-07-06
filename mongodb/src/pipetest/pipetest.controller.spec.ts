import { Test, TestingModule } from '@nestjs/testing';
import { PipetestController } from './pipetest.controller';

describe('PipetestController', () => {
  let controller: PipetestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PipetestController],
    }).compile();

    controller = module.get<PipetestController>(PipetestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
