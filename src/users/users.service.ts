import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './Schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userRepo: Model<User>,
    ) { }

    findById(id: string) {
        return this.userRepo.findById(id);
    }

    findByParam(paramSearch: any) {
        return this.userRepo.find(paramSearch);
    }

    delete(id: string) {
        return this.userRepo.findByIdAndDelete(id);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        const user = this.userRepo.findByIdAndUpdate(id, updateUserDto);
        return user;
    }

}
