import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class SignupUserDto {

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsDateString()
    birthDay: string;

    rememberMe: boolean;
}