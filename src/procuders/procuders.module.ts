import { Module } from '@nestjs/common';
import { ProcudersService } from './procuders.service';
import { ProcudersController } from './procuders.controller';

@Module({
  providers: [ProcudersService],
  controllers: [ProcudersController]
})
export class ProcudersModule {}
