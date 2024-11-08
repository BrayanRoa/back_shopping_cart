import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseService } from 'src/shared/base_service.service';
import { PlantillaResponse } from 'src/shared/base-response';

@Injectable()
export class CategoryService extends BaseService {

  constructor() {
    super();
  }
  create(createCategoryDto: CreateCategoryDto): Promise<PlantillaResponse<string>> {
    return this.handleErrors(async () => {
      await BaseService.prisma.categoria.create({
        data: createCategoryDto,
      });
      return 'category created successfully';
    });
  }

  async findAll(): Promise<PlantillaResponse<any>> {
    return this.handleErrors(async () => {
      return await BaseService.prisma.categoria.findMany()
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
