import { Injectable } from '@nestjs/common';
import { CreateStadeDto } from './dto/create-stade.dto';
import { UpdateStadeDto } from './dto/update-stade.dto';
import { BaseService } from 'src/shared/base_service.service';

@Injectable()
export class StadeService extends BaseService {
  create(createStadeDto: CreateStadeDto) {
    return 'This action adds a new stade';
  }

  findAll() {
    return this.handleErrors(() => {
      return BaseService.prisma.estado.findMany({
        where: {
          deleted_at: null
        }
      });
    })
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
