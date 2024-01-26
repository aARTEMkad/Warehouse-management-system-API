import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CategoresService } from './categores.service';

@Controller('categores')
export class CategoresController {

    constructor(private categoryService: CategoresService) {    }

    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get('/:id')
    findByIdCategory(@Param('id') id: string) {
        return this.categoryService.findById(id);
    } 

    @Get()
    findByParamCategory(@Body() paramSearch: any) {
        return this.categoryService.findByParam(paramSearch);
    }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.delete(id);
    }

    @Patch('/:id')
    updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }
}
