import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ValidationDb } from './validation-db';
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
            console.error(error);
    
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Manejo de errores específicos de Prisma
                throw this.validationDb.validate(error);
            } else if (error instanceof HttpException) {
                throw error;
            } else {
                // Para otros errores inesperados, devuelve una respuesta personalizada
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
