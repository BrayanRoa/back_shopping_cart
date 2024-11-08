import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { StadeModule } from './stade/stade.module';
import { OrdersModule } from './orders/orders.module';
import { ProductOrdersModule } from './product_orders/product_orders.module';
import { UsersModule } from './users/users.module';
import { PaymentMethodsModule } from './payment_methods/payment_methods.module';

@Module({
  imports: [CategoryModule, ProductsModule, StadeModule, OrdersModule, ProductOrdersModule, UsersModule, PaymentMethodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
