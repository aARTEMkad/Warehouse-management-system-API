import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";


export class UpdateUserDto {

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsDateString()
    @IsOptional()
    birthDay: string;
}