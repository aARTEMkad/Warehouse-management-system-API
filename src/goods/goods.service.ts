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
        try {
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
        } catch(err) {
            return err;
        }
    }

    findById(id: string) {
        return this.goodsRepo.findById(id)
    }

    findAll(paramSearch: any) {
        return this.goodsRepo.find(paramSearch);
    }

    async delete(id: string) {
        try {
            const removeGoods = await this.goodsRepo.findByIdAndDelete(id); 

            const findProcuder = await this.repoProcuder.findOne({ Name: removeGoods.Procuder });
            const findCategory = await this.repoCategory.findOne({ Name: removeGoods.Category });
            
            await findProcuder.updateOne({
                $pull: {
                    Goods: removeGoods._id
                }
            })
            await findCategory.updateOne({
                $pull: {
                    Goods: removeGoods._id
                }
            })
    
            return removeGoods
        } catch(err) {
            return err;
        }
    }

    async update(id: string, updateGoodsDto: UpdateGoodsDto) {
        try {
            const goods = await this.goodsRepo.findByIdAndUpdate(id, updateGoodsDto); 

            if(!updateGoodsDto.Category && !updateGoodsDto.Procuder) {
                return goods;
            } 
            
            if(updateGoodsDto.Category) {
                const OldfindCategory = await this.repoCategory.findOne({ Name: goods.Category });

                await OldfindCategory.updateOne({
                    $pull: {
                        Goods: goods._id
                    }
                })

                const newfindCategory = await this.repoCategory.findOne({ Name: updateGoodsDto.Category });

                if(!newfindCategory) throw new HttpException('Category not found', 400);

                await newfindCategory.updateOne({
                    $push: {
                        Goods: goods._id
                    }
                })
            }
            
            if(updateGoodsDto.Procuder) {
                const OldfindProcuder = await this.repoProcuder.findOne({ Name: goods.Procuder });

                await OldfindProcuder.updateOne({
                    $pull: {
                        Goods: goods._id
                    }
                })

                const newfindProcuder = await this.repoProcuder.findOne({ Name: updateGoodsDto.Procuder });

                if(!newfindProcuder) throw new HttpException('Procuder not found', 400);

                await newfindProcuder.updateOne({
                    $push: {
                        Goods: goods._id
                    }
                })
            }

            return goods;
        } catch(err) {
            return err;
        }
    }
}
