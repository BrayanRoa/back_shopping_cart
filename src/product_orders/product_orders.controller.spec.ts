import { Test, TestingModule } from '@nestjs/testing';
import { ProductOrdersController } from './product_orders.controller';
import { ProductOrdersService } from './product_orders.service';

describe('ProductOrdersController', () => {
  let controller: ProductOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductOrdersController],
      providers: [ProductOrdersService],
    }).compile();

    controller = module.get<ProductOrdersController>(ProductOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
