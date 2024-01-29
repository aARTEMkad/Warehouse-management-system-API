import { Module } from '@nestjs/common';
import { ProcudersService } from './procuders.service';
import { ProcudersController } from './procuders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Procuder, ProcuderSchema } from './Schemas/procuder.schema';
import { AuthModule } from 'src/auth/auth.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [
    AuthModule,
    TokensModule,
    MongooseModule.forFeature([
      {
        name: Procuder.name,
        schema: ProcuderSchema
      }
    ])
  ],
  providers: [ProcudersService],
  controllers: [ProcudersController],
})
export class ProcudersModule {}
