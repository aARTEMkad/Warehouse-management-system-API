import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokensService } from "src/tokens/tokens.service";


@Injectable()
export class JwtTokenGuard implements CanActivate {

    constructor(private jwtAuthService: TokensService) {}

    canActivate(context: ExecutionContext): boolean {
        const request =  context.switchToHttp().getRequest()
        const token = request.headers.authorization?.split(' ')[1];

        if(!token) {
            return false;
        }

        const checkedToken = this.jwtAuthService.checkVerifyToken(token)
        
        if(!checkedToken) {
            return false;
        }
        request.user = checkedToken

        return true;
    }
}