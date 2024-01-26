import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProcuderDto } from './dto/createProcuder.dto';
import { UpdateProducerDto } from './dto/updateProcuder.dto';

@Controller('procuders')
export class ProcudersController {

    @Post()
    createProcuder(@Body() createProcuderDto: CreateProcuderDto) {
        
    }

    @Get('/:id')
    findById(@Param('id') id: string) {

    }

    @Get()
    findByParam(@Body() paramSearch: any) {

    }

    @Delete('/:id')
    deleteProcuder(@Param('id') id: string) {

    }

    @Patch('/:id')
    updateProcuder(@Param('id') id: string, @Body() updateProcuderDto: UpdateProducerDto) {

    }

}
