import { IsOptional, IsString } from "class-validator";

export class UpdateProducerDto {
    @IsOptional()
    @IsString()
    Name: string;
}