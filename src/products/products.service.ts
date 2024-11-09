import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { BaseService } from 'src/shared/base_service.service';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';

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

  productosPedidos(createOrderDto: CreateOrderDto) {
    return this.handleErrors(async () => {
      const { producto, DatosUsuario, comentario, idMedioPago, idEstado } = createOrderDto;

      // Paso 1: Crear el pedido
      const order = await BaseService.prisma.pedidos.create({
        data: {
          id_usuario: DatosUsuario,
          comentario,
          id_medio_pago: idMedioPago,
          fecha: new Date(),
          id_estado: idEstado,
        },
      });

      const product = await BaseService.prisma.productos.findMany({
        where: {
          id: producto,
          deleted_at: null
        }
      })

      const test = await BaseService.prisma.pedidos_productos.create({
        data: {
          cantidad: 1,
          id_pedido: order.id,
          id_producto: producto,
          total: product[0].precio,
          comision: 0
        }
      })

      console.log({ test });

      return 'Products added to order successfully';
    });
  }

  findAll(id: string | undefined, id_business: string, filters: { categoria?: string; precio?: number } = {}) {
    return this.handleErrors(() => {

      return BaseService.prisma.productos.findMany({
        where: {
          deleted_at: null,
          id_business,
          ...(filters.categoria && {
            categoria: {
              nombre: filters.categoria,  // Filtrado en el campo anidado `id_categoria`
            },
          }),
          ...(filters.precio && { precio: filters.precio }),
          pedidos_productos: {
            some: {
              id_pedido: { not: null } // Asegura que el producto esté relacionado con al menos un pedido
            }
          }
        },
        include: {
          pedidos_productos: {
            where: {
              // Si `id` está presente, se agrega como filtro
              ...(id && { pedidos: { id } }), // Si `id` es proporcionado, lo agregamos al filtro
            },
            include: {
              pedidos: true,
            }
          }
        }
      });
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.handleErrors(async () => {
      await BaseService.prisma.pedidos.update({
        where: {
          id,
        },
        data: updateOrderDto,
      })
      return 'Order updated successfully';
    })
  }

  remove(id: string) {
    return this.handleErrors(async () => {
      await BaseService.prisma.pedidos.update({
        where: {
          id,
        },
        data: {
          deleted_at: new Date(),
        },
      })
      return "Order deleted successfully"
    })
  }
}
