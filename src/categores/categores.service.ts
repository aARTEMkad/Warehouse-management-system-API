import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './Schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoresService {

    constructor(@InjectModel(Category.name) private categoryRepo: Model<Category>) {    }

    create(createCategoryDto: CreateCategoryDto) {
        const category = new this.categoryRepo(createCategoryDto);
        return category.save();
    }

    findById(id: string) {
        return this.categoryRepo.findById(id);
    }

    findByParam(paramSearch: any) {
        return this.categoryRepo.find(paramSearch);
    }

    delete(id: string) {
        return this.categoryRepo.findByIdAndDelete(id);
    }

    update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const category = this.categoryRepo.findByIdAndUpdate(id, updateCategoryDto);
        return category;
    }
}
