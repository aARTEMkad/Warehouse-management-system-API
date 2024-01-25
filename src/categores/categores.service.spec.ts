import { Test, TestingModule } from '@nestjs/testing';
import { CategoresService } from './categores.service';

describe('CategoresService', () => {
  let service: CategoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoresService],
    }).compile();

    service = module.get<CategoresService>(CategoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
