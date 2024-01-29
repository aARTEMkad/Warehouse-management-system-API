import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateProcuderDto } from './dto/createProcuder.dto';
import { UpdateProducerDto } from './dto/updateProcuder.dto';
import { ProcudersService } from './procuders.service';
import { JwtTokenGuard } from 'src/auth/guards/auth.guard';

@Controller('procuders')
@UseGuards(JwtTokenGuard)
export class ProcudersController {

    constructor(private producerService: ProcudersService) {}

    @Post()
    createProcuder(@Body() createProcuderDto: CreateProcuderDto) {
        return this.producerService.create(createProcuderDto);
    }

    @Get('/:id')
    findById(@Param('id') id: string) {
        return this.producerService.findById(id);
    }

    @Get()
    findByParam(@Body() paramSearch: any) {
        return this.producerService.findByParam(paramSearch);
    }

    @Delete('/:id')
    deleteProcuder(@Param('id') id: string) {
        return this.producerService.delete(id);
    }

    @Patch('/:id')
    updateProcuder(@Param('id') id: string, @Body() updateProcuderDto: UpdateProducerDto) {
        return this.producerService.update(id, updateProcuderDto);
    }

}
