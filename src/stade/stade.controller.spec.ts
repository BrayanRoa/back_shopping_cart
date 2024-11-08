import { Test, TestingModule } from '@nestjs/testing';
import { StadeController } from './stade.controller';
import { StadeService } from './stade.service';

describe('StadeController', () => {
  let controller: StadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StadeController],
      providers: [StadeService],
    }).compile();

    controller = module.get<StadeController>(StadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
