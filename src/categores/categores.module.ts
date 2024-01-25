import { Module } from '@nestjs/common';
import { CategoresController } from './categores.controller';
import { CategoresService } from './categores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CaterogySchema } from './Models/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CaterogySchema
      }
    ])
  ],
  controllers: [CategoresController],
  providers: [CategoresService]
})
export class CategoresModule {}
