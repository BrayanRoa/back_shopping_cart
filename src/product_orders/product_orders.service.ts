import { Injectable } from '@nestjs/common';
import { CreateProductOrderDto } from './dto/create-product_order.dto';
import { UpdateProductOrderDto } from './dto/update-product_order.dto';

@Injectable()
export class ProductOrdersService {
  create(createProductOrderDto: CreateProductOrderDto) {
    return 'This action adds a new productOrder';
  }

  findAll() {
    return `This action returns all productOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productOrder`;
  }

  update(id: number, updateProductOrderDto: UpdateProductOrderDto) {
    return `This action updates a #${id} productOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOrder`;
  }
}
