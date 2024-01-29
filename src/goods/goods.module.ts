import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Goods, GoodsSchema } from './Schemas/goods.schema';
import { Procuder, ProcuderSchema } from 'src/procuders/Schemas/procuder.schema';
import { Category, CaterogySchema } from 'src/categores/Schemas/category.schema';
import { AuthModule } from 'src/auth/auth.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [
    AuthModule,
    TokensModule,
    MongooseModule.forFeature([
      {
        name: Goods.name,
        schema: GoodsSchema
      },
      {
        name: Procuder.name,
        schema: ProcuderSchema 
      },
      {
        name: Category.name,
        schema: CaterogySchema
      }
    ]),
  ],
  providers: [GoodsService],
  controllers: [GoodsController],
})
export class GoodsModule {}
