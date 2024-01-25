import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodsDto } from './dto/createGoods.dto';
import { UpdateGoodsDto } from './dto/updateGoods.dto';

@Controller('goods')
export class GoodsController {

    constructor(private goodsService: GoodsService) {}

    @Post()
    addGoods(@Body() goodsCreateDto: CreateGoodsDto) {

    }

    @Get('/:id')
    findIdGoods(@Param('id') id: string) {

    }

    @Get()
    findGoods(@Body() paramSearch: any) {

    }

    @Delete('/:id')
    deleteGoods(@Param('id') id: string) {

    }

    @Patch('/:id')
    updateGoods(@Param('id') id: string, @Body() goodsUpdateDto: UpdateGoodsDto) {

    }
}
