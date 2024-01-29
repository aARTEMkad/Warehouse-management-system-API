import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from './Schemas/refreshToken.schema';
import { JwtService } from '@nestjs/jwt';

export class StructurToken {
    userID: any;
    username: string;

    constructor(userID: any, username: string) {
        this.userID = userID;
        this.username = username
    }
}

@Injectable()
export class TokensService {

    constructor(
        @InjectModel(RefreshToken.name) private refrTokenRep: Model<RefreshToken>,
        private jwtService: JwtService) {}

    generatedTokens(saltToken, structrToken: StructurToken) {
        const infoToken = {
            userID: structrToken.userID,
            username: structrToken.username,
        }
        const token = this.jwtService.sign(infoToken, { secret: saltToken });
        return token;
    }

    async checkVerifyToken(Token) {
        try {
            const token = await this.jwtService.verifyAsync(Token);
            return token;
        } catch(err) {
            return null;
        }
    }

    async saveTokenInDB(userID, refreshToken) {
        await this.refrTokenRep.findOneAndDelete({ userID });
        const token = new this.refrTokenRep({userID, refreshToken});
        return token.save();
    }

    async updateAccessToken(saltAccessToken, RefreshToken) {
        if(!this.checkVerifyToken(RefreshToken)) {
            throw new HttpException('Not actived refrest token!', 400);
        } else {
            const structur = this.jwtService.decode(RefreshToken)
            const accessToken = this.generatedTokens(saltAccessToken, structur);
            return accessToken;
        }
    }

    findByUserId(userID: string) {
        return this.refrTokenRep.findOne({ userID });
    }

    decodedToken(token) {
        return this.jwtService.decode(token);
    }
}
