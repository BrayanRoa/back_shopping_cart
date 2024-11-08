import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string

    @IsString()
    @IsNotEmpty()
    readonly nombre: string
}
