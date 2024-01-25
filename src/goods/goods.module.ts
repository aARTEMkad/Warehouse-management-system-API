import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Goods, GoodsSchema } from './Models/goods.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Goods.name,
        schema: GoodsSchema
      },
    ]),
  ],
  providers: [GoodsService],
  controllers: [GoodsController]
})
export class GoodsModule {}
