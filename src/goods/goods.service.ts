import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Goods } from './Schemas/goods.schema';
import { Model } from 'mongoose';
import { CreateGoodsDto } from './dto/createGoods.dto';
import { UpdateGoodsDto } from './dto/updateGoods.dto';

@Injectable()
export class GoodsService {

    constructor(@InjectModel(Goods.name) private goodsRepo: Model<Goods>) {}
    
    create(createGoodsDto: CreateGoodsDto) {

        //code added new category and procuder

        // ---
        const goods = new this.goodsRepo(createGoodsDto);
        return goods.save()
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
