import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { BaseService } from 'src/shared/base_service.service';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
      const { producto, DatosUsuario, comentario, idMedioPago, idEstado, cantidad = 1 } = createOrderDto;

      const product = await BaseService.prisma.productos.findMany({
        where: {
          id: producto,
          deleted_at: null
        }
      })

      if (product.length === 0) {
        throw new BadRequestException('El producto no existe');
      }

      if (cantidad > product[0].cantidad) {
        throw new BadRequestException(`No hay suficientes productos para cubrir la compra, solo hay ${product[0].cantidad} disponbles`);
      }

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

      this.updateProduct(product[0].id, { cantidad: product[0].cantidad - cantidad })

      await BaseService.prisma.pedidos_productos.create({
        data: {
          cantidad,
          id_pedido: order.id,
          id_producto: producto,
          total: cantidad * (+product[0]?.precio),
          comision: 0
        }
      })

      return 'Products added to order successfully';
    });
  }


  findAll(id: string | undefined, id_business: string | undefined, filters: { categoria?: string; precio?: number } = {}) {
    return this.handleErrors(() => {

      return BaseService.prisma.productos.findMany({
        where: {
          deleted_at: null,
          ...(id_business && { id_business }),
          ...(filters.categoria && {
            categoria: {
              nombre: filters.categoria,
            },
          }),
          ...(filters.precio && { precio: filters.precio }),
          pedidos_productos: {
            some: {
              id_pedido: { not: null },
              pedidos: { deleted_at: null }  // Filtra para pedidos que no estén eliminados
            }
          }
        },
        include: {
          pedidos_productos: {
            where: {
              pedidos: { deleted_at: null },  // Filtra pedidos no eliminados en `pedidos_productos`
              ...(id && { pedidos: { id } }),
            },
            include: {
              pedidos: true,
            },
            orderBy: {
              id_pedido: "asc"
            }
          }
        }
      });

    });
  }

  findOne(id: string) {
    return this.handleErrors(() => {
      return BaseService.prisma.pedidos.findUnique({
        where: {
          id,
          deleted_at: null
        },
        include: {
          pedidos_productos: {
            include: {
              productos: true,
            },
          },
        },
      })
    })
  }

  updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return this.handleErrors(async () => {
      await BaseService.prisma.productos.update({
        where: {
          id,
        },
        data: updateProductDto,
      })
      return 'Product updated successfully';
    })
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.handleErrors(async () => {

      if (updateOrderDto.cantidad) {
        const order = await BaseService.prisma.pedidos_productos.findMany({
          where: {
            id_pedido: id
          },
          include: {
            productos: {
              include: {
                pedidos_productos: true
              }
            }
          },

        })

        if (updateOrderDto.cantidad > order[0].productos.pedidos_productos[0].cantidad) {
          const producto = await BaseService.prisma.productos.findMany({
            where: {
              id: order[0].id_producto
            }
          })

          if (updateOrderDto.cantidad > producto[0].cantidad) {
            throw new BadRequestException(`No hay suficientes productos para cubrir la compra, solo hay ${producto[0].cantidad} disponbles`);
          }
        }
        await BaseService.prisma.pedidos_productos.update({
          where: {
            id: order[0].id,
          },
          data: {
            cantidad: updateOrderDto.cantidad,
            total: updateOrderDto.cantidad * (+order[0].productos.precio),
          }
        })
      }

      await BaseService.prisma.pedidos.update({
        where: {
          id,
        },
        data: {
          comentario: updateOrderDto.comentario,
          id_medio_pago: updateOrderDto.idMedioPago,
          id_estado: updateOrderDto.idEstado,
          id_usuario: updateOrderDto.DatosUsuario
        },
      })
      return 'Order updated successfully';
    })
  }

  remove(id: string) {
    return this.handleErrors(async () => {

      const a = await BaseService.prisma.pedidos.update({
        where: {
          id,
        },
        data: {
          deleted_at: new Date(),
        },
        include: {
          pedidos_productos: true,  // Incluir el campo anidado pedidos_productos
        },
      })

      console.log(a.pedidos_productos[0].id);
      await BaseService.prisma.pedidos_productos.update({
        where: {
          id: a.pedidos_productos[0].id,
        },
        data: {
          deleted_at: new Date(),
        },
      })

      return "Order deleted successfully"
    })
  }

  getAllProducts() {
    return this.handleErrors(() => {
      return BaseService.prisma.productos.findMany({
        where: {
          deleted_at: null
        }
      })
    })
  }
}
