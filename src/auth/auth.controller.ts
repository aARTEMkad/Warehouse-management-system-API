import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { SigninUserDto } from './dto/SigninUser.dto';
import { SignupUserDto } from './dto/SignupUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('signin')
    signin(@Body() signInDto: SigninUserDto) {
        return this.authService.signin(signInDto);    
    }


    @Post('signup')
    signup(@Body() signupDto: SignupUserDto) {
        return this.authService.signup(signupDto);
    }


    @Get('updateToken')
    updateToken(@Headers('authorization') authorizationHeaders: string) {
        const accessToken = authorizationHeaders.split(' ')[1];
        return this.authService.updateToken(accessToken);
    }
}
