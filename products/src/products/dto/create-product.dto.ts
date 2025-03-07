import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Type(() => Number) // trasnfromar a numero el string cuando no llega de JSON
    price: number;


}
