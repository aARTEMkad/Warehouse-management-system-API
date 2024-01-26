import { IsOptional, IsString } from "class-validator";


export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    Name: string;
}