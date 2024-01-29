import { Module } from '@nestjs/common';
import { CategoresController } from './categores.controller';
import { CategoresService } from './categores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CaterogySchema } from './Schemas/category.schema';
import { AuthModule } from 'src/auth/auth.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [
    AuthModule,
    TokensModule,
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CaterogySchema
      }
    ])
  ],
  controllers: [CategoresController],
  providers: [CategoresService],
})
export class CategoresModule {}
