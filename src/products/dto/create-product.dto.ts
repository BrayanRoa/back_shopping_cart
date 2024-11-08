import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    precio: number

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    cantidad: number

    @IsString()
    @IsNotEmpty()
    id_business: string

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id_categoria: string

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    imagen: string

    @IsBoolean()
    @IsNotEmpty()
    disponible: boolean

    @IsString()
    descripcion: string

    @IsString()
    comision: string
}
