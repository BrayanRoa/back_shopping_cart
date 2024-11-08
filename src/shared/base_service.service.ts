import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ValidationDb } from './validation-db';
import { CustomResponse } from './custom-response';
import { PlantillaResponse } from './base-response';

@Injectable()
export class BaseService {

    validationDb: ValidationDb;
    static prisma: PrismaClient = new PrismaClient();

    constructor() {
        this.validationDb = new ValidationDb();
    }

    async handleErrors<T>(operation: () => Promise<T>): Promise<PlantillaResponse<T>> {
        try {
            const result = await operation();
            return {
                rta: true,
                message: 'Operation completed successfully',
                httpStatus: HttpStatus.OK,
                data: result,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw this.validationDb.validate(error);
            } else {
                console.error(error);
                return {
                    rta: false,
                    message: error.message || 'An unexpected error occurred',
                    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
                    data: null,
                };
            }
        }
    }

}
