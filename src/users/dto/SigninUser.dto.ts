import { IsString } from "class-validator";

export class SigninUserDto {

    @IsString()
    usernameOrEmail: string;

    @IsString()
    password: string;
}