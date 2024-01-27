import { IsString } from "class-validator";

export class CreateProcuderDto {
    @IsString()
    Name: string;
}