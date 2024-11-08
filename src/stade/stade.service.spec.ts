import { Test, TestingModule } from '@nestjs/testing';
import { StadeService } from './stade.service';

describe('StadeService', () => {
  let service: StadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StadeService],
    }).compile();

    service = module.get<StadeService>(StadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
