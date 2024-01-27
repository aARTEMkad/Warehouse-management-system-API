import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoresModule } from './categores/categores.module';
import { ProcudersModule } from './procuders/procuders.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'env/setting.env'}),
    MongooseModule.forRoot(`mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.xbbyrq7.mongodb.net/`, { dbName: 'WareHouseManagment'}),
    GoodsModule,
    ProcudersModule,
    CategoresModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
