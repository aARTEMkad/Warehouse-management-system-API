import { Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    UsePipes, 
    ValidationPipe } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodsDto } from './dto/createGoods.dto';
import { UpdateGoodsDto } from './dto/updateGoods.dto';

@Controller('goods')
@UsePipes(new ValidationPipe()) 
export class GoodsController {

    constructor(private goodsService: GoodsService) {}

    @Post()
    addGoods(@Body() goodsCreateDto: CreateGoodsDto) {
        return this.goodsService.create(goodsCreateDto);
    }

    @Get('/:id')
    findIdGoods(@Param('id') id: string) {
        return this.goodsService.findById(id);
    }

    @Get()
    findGoods(@Body() paramSearch: any) {
        return this.goodsService.findAll(paramSearch);
    }

    @Delete('/:id')
    deleteGoods(@Param('id') id: string) {
        return this.goodsService.delete(id);
    }

    @Patch('/:id')
    updateGoods(@Param('id') id: string, @Body() goodsUpdateDto: UpdateGoodsDto) {
        return this.goodsService.update(id, goodsUpdateDto);
    }
}
