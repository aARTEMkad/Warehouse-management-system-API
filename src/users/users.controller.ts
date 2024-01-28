import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {   }
    
    @Get('/:id')
    getUserByID(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Get()
    getUsersByParam(@Body() paramSearch: any) {
        return this.usersService.findByParam(paramSearch);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

    @Patch('/:id') // Add function check user
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
}
