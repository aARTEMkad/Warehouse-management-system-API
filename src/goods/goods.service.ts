import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Goods } from './Schemas/goods.schema';
import { Model } from 'mongoose';
import { CreateGoodsDto } from './dto/createGoods.dto';
import { UpdateGoodsDto } from './dto/updateGoods.dto';
import { Procuder } from 'src/procuders/Schemas/procuder.schema';
import { Category } from 'src/categores/Schemas/category.schema';

@Injectable()
export class GoodsService {

    constructor(
        @InjectModel(Goods.name) private goodsRepo: Model<Goods>,
        @InjectModel(Procuder.name) private repoProcuder: Model<Procuder>,
        @InjectModel(Category.name) private repoCategory: Model<Procuder>,
    ) {}
    
    async create(createGoodsDto: CreateGoodsDto) {
        if(createGoodsDto.Procuder && createGoodsDto.Category) {
            const findProcuder = await this.repoProcuder.findOne({ Name: createGoodsDto.Procuder });
            const findCategory = await this.repoCategory.findOne({ Name: createGoodsDto.Category });
            
            if(!findProcuder) throw new HttpException('Procuder not found', 400);
            else if(!findCategory) throw new HttpException('Category not found', 400);


            const goods = new this.goodsRepo(createGoodsDto);
            const goodsSave = await goods.save();
            
            await findProcuder.updateOne({
                $push: {
                    Goods: goodsSave._id
                }
            })
            await findCategory.updateOne({
                $push: {
                    Goods: goodsSave._id
                }
            })

            return goodsSave
        } else {
            throw new HttpException("Not found procuder and category", 400);
        }
    }

    findById(id: string) {
        return this.goodsRepo.findById(id)
    }

    findAll(paramSearch: any) {
        return this.goodsRepo.find(paramSearch);
    }

    delete(id: string) {
        return this.goodsRepo.findByIdAndDelete(id);
    }

    update(id: string, updateGoodsDto: UpdateGoodsDto) {

        const goods = this.goodsRepo.findByIdAndUpdate(id, updateGoodsDto); 

        // check update procuder and category

        // ------
        
        return goods
    }
}
