import { Test, TestingModule } from '@nestjs/testing';
import { ProcudersController } from './procuders.controller';

describe('ProcudersController', () => {
  let controller: ProcudersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcudersController],
    }).compile();

    controller = module.get<ProcudersController>(ProcudersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
