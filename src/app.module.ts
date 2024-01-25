import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoresModule } from './categores/categores.module';
import { ProcudersModule } from './procuders/procuders.module';

@Module({
  imports: [
    MongooseModule.forRoot(''),
    GoodsModule,
    ProcudersModule,
    CategoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
