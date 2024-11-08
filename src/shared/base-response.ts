// response-template.dto.ts
import { HttpStatus } from '@nestjs/common';

export class PlantillaResponse<T> {
    rta: boolean;
    message: string;
    httpStatus: HttpStatus;
    data?: T;
    dataList?: T[];
}
