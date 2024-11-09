import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BaseService } from 'src/shared/base_service.service';

@Injectable()
export class OrdersService extends BaseService {


  create(){
    return 'This action adds a new order';
  }
  findAll() {
    return this.handleErrors(() =>{
      return BaseService.prisma.pedidos.findMany({
        where: {
          deleted_at: null
        }
      })
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
