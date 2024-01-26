import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('categores')
export class CategoresController {

    @Post()
    createCategory(createCategoryDto: CreateCategoryDto) {

    }

    @Get('/:id')
    findByIdCategory(@Param('id') id: string) {

    } 

    @Get()
    findByParamCategory(@Body() paramSearch: any) {

    }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string) {

    }

    @Patch('/:id')
    updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {

    }
}
