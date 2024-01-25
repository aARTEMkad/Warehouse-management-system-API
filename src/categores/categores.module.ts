import { Module } from '@nestjs/common';
import { CategoresController } from './categores.controller';
import { CategoresService } from './categores.service';

@Module({
  controllers: [CategoresController],
  providers: [CategoresService]
})
export class CategoresModule {}
