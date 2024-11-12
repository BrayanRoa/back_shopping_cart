import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';

@Controller('productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post("/pedidos/add")
  @HttpCode(HttpStatus.CREATED)
  productosPedidos(
    @Body() createOrderDto: CreateOrderDto,
    @Headers() headers: Record<string, string>,
  ) {
    console.log(console.log(`IP: ${headers['ip']}, Dominio: ${headers['dominio']}, Usuario: ${headers['usuario']}, Proceso: ${headers['proceso']}`));
    return this.productsService.productosPedidos(createOrderDto);
  }

  @Get("/all")
  getAllProducts(
    @Headers() headers: Record<string, string>,
  ) {
    console.log(console.log(`IP: ${headers['ip']}, Dominio: ${headers['dominio']}, Usuario: ${headers['usuario']}, Proceso: ${headers['proceso']}`));
    return this.productsService.getAllProducts()
  }

  @Get("/pedidos/all")
  findAll(
    @Query('id') id: string | undefined,
    @Query('idBusiness') idBusiness: string,
    @Query('filters') filters: { categoria?: string; precioMin?: number; },
    @Headers() headers: Record<string, string>,
  ) {
    console.log(console.log(`IP: ${headers['ip']}, Dominio: ${headers['dominio']}, Usuario: ${headers['usuario']}, Proceso: ${headers['proceso']}`));
    return this.productsService.findAll(id, idBusiness, filters);
  }

  @Get('/pedidos/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch('/pedidos/update')
  update(
    @Query('id') id: string,
    @Body() updateProductDto: UpdateOrderDto,
    @Headers() headers: Record<string, string>
  ) {
    console.log(console.log(`IP: ${headers['ip']}, Dominio: ${headers['dominio']}, Usuario: ${headers['usuario']}, Proceso: ${headers['proceso']}`));
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('/pedidos/delete')
  remove(
    @Query('id') id: string | undefined,
    @Headers() headers: Record<string, string>,
  ) {
    console.log(console.log(`IP: ${headers['ip']}, Dominio: ${headers['dominio']}, Usuario: ${headers['usuario']}, Proceso: ${headers['proceso']}`));
    return this.productsService.remove(id);
  }
}
