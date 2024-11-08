import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BaseService } from 'src/shared/base_service.service';
import { PlantillaResponse } from 'src/shared/base-response';

@Injectable()
export class OrdersService extends BaseService {

  async addProductsToOrder(createOrderDto: CreateOrderDto): Promise<PlantillaResponse<string>> {
    return this.handleErrors(async () => {
      const { producto, datos_usuario, comentario, id_medio_pago, id_estado } = createOrderDto;

      // Paso 1: Crear el pedido
      const order = await BaseService.prisma.pedidos.create({
        data: {
          datos_usuario,
          comentario,
          id_medio_pago,
          fecha: new Date(),
          id_estado,
        },
      });

      // Paso 2: Crear relaciones en `pedido_producto` para cada producto en el arreglo
      await BaseService.prisma.pedidos_productos.create({
        data: {
          cantidad: 1,
          id_pedido: order.id,
          id_producto: producto,
          total: (await BaseService.prisma.productos.findFirst({
            where: {
              id: producto,
              deleted_at: null
            }
          })).precio,
          comision: 0
        }
      })

      return 'Products added to order successfully';
    });
  }


  findAll() {
    return `This action returns all orders`;
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
