import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/user.schema';
import { Model } from 'mongoose';
import { SigninUserDto } from './dto/SigninUser.dto';
import { SignupUserDto } from './dto/SignupUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userRepo: Model<User>) { }

    signin({rememberMe, ...signinDto}: SigninUserDto) {

    }

    signup({rememberMe, ...signupDto}: SignupUserDto) {
        
        const user = new this.userRepo(signupDto)

        if(rememberMe) {

        } else {
            return user;
        }
    }

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
