import { Module } from '@nestjs/common';
import { StadeService } from './stade.service';
import { StadeController } from './stade.controller';

@Module({
  controllers: [StadeController],
  providers: [StadeService],
})
export class StadeModule {}
