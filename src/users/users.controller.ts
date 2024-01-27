import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { SigninUserDto } from './dto/SigninUser.dto';
import { SignupUserDto } from './dto/SignupUser.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {   }
    
    @Prop()
    signin(@Body() signInDto: SigninUserDto) {

    }


    @Prop()
    signup(@Body() signupDto: SignupUserDto) {
        
    }


    @Get('/:id')
    getUserByID(@Param('id') id: string) {

    }

    @Get()
    getUsersByParam(@Body() paramSearch: any) {

    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {

    }

    @Patch('/:id') 
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    }
}
