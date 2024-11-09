import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { BaseService } from 'src/shared/base_service.service';

@Injectable()
export class PaymentMethodsService extends BaseService {
  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return 'This action adds a new paymentMethod';
  }

  findAll() {
    return this.handleErrors(async()=>{
      return await BaseService.prisma.medios_pago.findMany({
        where:{
          deleted_at: null
        }
      })
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentMethod`;
  }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return `This action updates a #${id} paymentMethod`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentMethod`;
  }
}
