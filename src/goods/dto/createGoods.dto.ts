import { IsNumber, IsString, MaxLength } from "class-validator";


export class CreateGoodsDto {

    @IsString()
    @MaxLength(40)
    Name: string;

    @IsString()
    CodeGoods: string;

    @IsString()
    Category: string;

    @IsString()
    Procuder: string;

    @IsString()
    @MaxLength(600)
    ProductDescription: string;

    @IsNumber()
    CountInWarehouse: number;

    @IsNumber()
    PriceBuy: number

    @IsNumber()
    PriceSell: number

    @IsString()
    SerialNumbers: string;
}