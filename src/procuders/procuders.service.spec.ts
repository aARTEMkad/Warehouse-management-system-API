import { Test, TestingModule } from '@nestjs/testing';
import { ProcudersService } from './procuders.service';

describe('ProcudersService', () => {
  let service: ProcudersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcudersService],
    }).compile();

    service = module.get<ProcudersService>(ProcudersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
