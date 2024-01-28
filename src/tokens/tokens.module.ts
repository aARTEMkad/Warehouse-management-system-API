import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './Schemas/refreshToken.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema
      }
    ]),
    JwtModule.register(
      {
        secret: process.env.SECRETACCESSTOKEN,
        signOptions: { expiresIn: '15m' },
      },
    ),
    JwtModule.register(
      {
        secret: process.env.SECRETREFRESHTOKEN,
        signOptions: { expiresIn: '30d' },
      },
    ),
  ],
  providers: [TokensService],
  exports: [TokensService]
})
export class TokensModule {}
