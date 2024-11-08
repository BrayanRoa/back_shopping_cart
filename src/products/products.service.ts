import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseService } from 'src/shared/base_service.service';

@Injectable()
export class ProductsService extends BaseService {
  async create(createProductDto: CreateProductDto) {
    return this.handleErrors(async () => {
      await BaseService.prisma.productos.create({
        data: createProductDto
      })
      return "product created successfully"
    })
  }

  findAll() {
    return this.handleErrors(async () => {
      return await BaseService.prisma.productos.findMany()
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
