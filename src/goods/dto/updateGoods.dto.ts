import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";


export class UpdateGoodsDto {
    
    @IsString()
    @MaxLength(40)
    @IsOptional()
    Name: string;

    @IsString()
    @IsOptional()
    CodeGoods: string;

    @IsString()
    @IsOptional()
    Category: string;

    @IsString()
    @IsOptional()
    Procuder: string;

    @IsString()
    @MaxLength(600)
    @IsOptional()
    ProductDescription: string;

    @IsNumber()
    @IsOptional()
    CountInWarehouse: number;

    @IsNumber()
    @IsOptional()
    PriceBuy: number

    @IsNumber()
    @IsOptional()
    PriceSell: number

    @IsString()
    @IsOptional()
    SerialNumbers: string;

}