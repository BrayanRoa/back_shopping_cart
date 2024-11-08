import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { StadeModule } from './stade/stade.module';
import { OrdersModule } from './orders/orders.module';
import { ProductOrdersModule } from './product_orders/product_orders.module';

@Module({
  imports: [CategoryModule, ProductsModule, StadeModule, OrdersModule, ProductOrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
