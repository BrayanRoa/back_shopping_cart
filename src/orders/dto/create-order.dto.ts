import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {

    @IsUUID()
    @IsString()
    datos_usuario: string

    @IsString()
    comentario: string;

    @IsUUID()
    @IsString()
    id_medio_pago: string;

    @IsUUID()
    @IsString()
    id_estado: string;

    @IsNotEmpty()
    @IsUUID()
    producto: string
}
