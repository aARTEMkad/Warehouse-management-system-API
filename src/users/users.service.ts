import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RolesUser, User } from './Schemas/user.schema';
import { Model } from 'mongoose';
import { SigninUserDto } from './dto/SigninUser.dto';
import { SignupUserDto } from './dto/SignupUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './Schemas/refreshToken.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userRepo: Model<User>,
        @InjectModel(RefreshToken.name) private refreshTokenRepo: Model<RefreshToken>,
        private jwtService: JwtService) { }

    // ---
    async signin({rememberMe, ...signinDto}: SigninUserDto) {

        const findUserByUsername = await this.userRepo.findOne({username: signinDto.usernameOrEmail});

        if(!findUserByUsername) {
            const findUserByEmail = await this.userRepo.findOne({ email: signinDto.usernameOrEmail});
            if(!findUserByEmail) {
                throw new HttpException('Not found user!', 400);
            }

            const [storageSalt, storageHashPassword] = findUserByEmail.password.split('.')
            
            signinDto.password = await bcrypt.hash(signinDto.password, storageSalt);
            
            console.log(signinDto, storageSalt)

            if(storageHashPassword !== signinDto.password) {
                throw new HttpException('Password and email incorrect!', 400)
            }
            if(!rememberMe) {
                return findUserByEmail;
            } else {
                // ---------
                const tmpRefreshAndAccessToken = {
                    userID: findUserByEmail._id,
                    username: findUserByEmail.username,
                    roles: findUserByEmail.roles
                }
    
                const accessToken = this.jwtService.sign(tmpRefreshAndAccessToken);
                const refreshToken = this.jwtService.sign(tmpRefreshAndAccessToken, { secret: process.env.SECRETREFRESHTOKEN})
    
                console.log('------\n')
                console.log(accessToken);
                console.log('--------\n')
                console.log(refreshToken)
    
                const tmpRefreshTokenDB = {
                    userID: findUserByEmail._id,
                    refreshToken: refreshToken,
                };
    
                const refreshTokenDB = new this.refreshTokenRepo(tmpRefreshTokenDB);
                refreshTokenDB.save();
    
                return {
                    findUserByEmail,
                    accessToken
                }
            }

        } 
        const [storageSalt, storageHashPassword] = findUserByUsername.password.split('.')
        
        signinDto.password = await bcrypt.hash(signinDto.password, storageSalt);
        
        console.log(signinDto, storageSalt)


        if(storageHashPassword !== signinDto.password) {
            throw new HttpException('Password and email incorrect!', 400)
        }
        if(!rememberMe) {
            return findUserByUsername;
        } else {
            // ---------
            const tmpRefreshAndAccessToken = {
                userID: findUserByUsername._id,
                username: findUserByUsername.username,
                roles: findUserByUsername.roles
            }

            const accessToken = this.jwtService.sign(tmpRefreshAndAccessToken);
            const refreshToken = this.jwtService.sign(tmpRefreshAndAccessToken, { secret: process.env.SECRETREFRESHTOKEN})

            console.log('------\n')
            console.log(accessToken);
            console.log('--------\n')
            console.log(refreshToken)

            const tmpRefreshTokenDB = {
                userID: findUserByUsername._id,
                refreshToken: refreshToken,
            };

            const refreshTokenDB = new this.refreshTokenRepo(tmpRefreshTokenDB);
            refreshTokenDB.save();

            return {
                findUserByUsername,
                accessToken
            }
        }
    }

    async signup({rememberMe, ...signupDto}: SignupUserDto) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(signupDto.password, salt);
        
        const resultPass = salt + "." + hash;
        signupDto.password = resultPass;

        const user = await new this.userRepo(Object.assign(signupDto, {roles: RolesUser.User}))

        if(rememberMe) {
            const tmpRefreshAndAccessToken = {
                userID: user._id,
                username: user.username,
                roles: user.roles
            }

            const accessToken = this.jwtService.sign(tmpRefreshAndAccessToken);
            const refreshToken = this.jwtService.sign(tmpRefreshAndAccessToken, { secret: process.env.SECRETREFRESHTOKEN})

            console.log('------\n')
            console.log(accessToken);
            console.log('--------\n')
            console.log(refreshToken)

            const tmpRefreshTokenDB = {
                userID: user._id,
                refreshToken: refreshToken,
            };

            const refreshTokenDB = new this.refreshTokenRepo(tmpRefreshTokenDB);
            refreshTokenDB.save();

            const saveUser = user.save()
            return {
                saveUser,
                accessToken
            }
        } else {
            return user.save();
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
