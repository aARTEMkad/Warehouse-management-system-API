import { Module } from '@nestjs/common';
import { ProcudersService } from './procuders.service';
import { ProcudersController } from './procuders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Procuder, ProcuderSchema } from './Models/procuder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Procuder.name,
        schema: ProcuderSchema
      }
    ])
  ],
  providers: [ProcudersService],
  controllers: [ProcudersController]
})
export class ProcudersModule {}
