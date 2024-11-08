import { Injectable } from '@nestjs/common';
import { CreateStadeDto } from './dto/create-stade.dto';
import { UpdateStadeDto } from './dto/update-stade.dto';

@Injectable()
export class StadeService {
  create(createStadeDto: CreateStadeDto) {
    return 'This action adds a new stade';
  }

  findAll() {
    return `This action returns all stade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stade`;
  }

  update(id: number, updateStadeDto: UpdateStadeDto) {
    return `This action updates a #${id} stade`;
  }

  remove(id: number) {
    return `This action removes a #${id} stade`;
  }
}
