import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {

    @IsUUID()
    @IsString()
    DatosUsuario: string

    @IsString()
    comentario: string;

    @IsUUID()
    @IsString()
    idMedioPago: string;

    @IsUUID()
    @IsString()
    idEstado: string;

    @IsNotEmpty()
    @IsUUID()
    producto: string

    @IsNumber()
    @IsOptional()
    cantidad:number;
}
