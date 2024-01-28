import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Schemas/user.schema';
import { RefreshToken, RefreshTokenSchema } from './Schemas/refreshToken.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
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
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
