import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/Schemas/user.schema';
import { TokensModule } from 'src/tokens/tokens.module';
import { JwtTokenGuard } from './guards/auth.guard';

@Module({
  imports: [
    TokensModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtTokenGuard],
  exports: [JwtTokenGuard]
})
export class AuthModule {}
