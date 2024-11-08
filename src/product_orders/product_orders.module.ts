import { Module } from '@nestjs/common';
import { ProductOrdersService } from './product_orders.service';
import { ProductOrdersController } from './product_orders.controller';

@Module({
  controllers: [ProductOrdersController],
  providers: [ProductOrdersService],
})
export class ProductOrdersModule {}
