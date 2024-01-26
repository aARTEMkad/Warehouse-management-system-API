import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Procuder } from './Schemas/procuder.schema';
import { Model } from 'mongoose';
import { CreateProcuderDto } from './dto/createProcuder.dto';
import { UpdateProducerDto } from './dto/updateProcuder.dto';

@Injectable()
export class ProcudersService {

    constructor(@InjectModel(Procuder.name) private repoProcuder: Model<Procuder>) {}

    create(createProcuderDto: CreateProcuderDto) {
        const procuder = new this.repoProcuder(createProcuderDto);
        return procuder.save()
    }

    findById(id: string) {
        return this.repoProcuder.findById(id);
    }

    findByParam(paramSearch: any) {
        return this.repoProcuder.find(paramSearch);
    }

    delete(id: string) {
        return this.repoProcuder.findByIdAndDelete(id);
    }

    update(id: string, updateProcuderDto: UpdateProducerDto) {
        const procuder = this.repoProcuder.findByIdAndUpdate(id, updateProcuderDto);
        return procuder;
    }
}
