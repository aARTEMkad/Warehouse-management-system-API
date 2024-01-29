import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/Schemas/user.schema';
import { SigninUserDto } from './dto/SigninUser.dto';
import * as bcrypt from 'bcrypt'
import { StructurToken, TokensService } from 'src/tokens/tokens.service';
import { SignupUserDto } from './dto/SignupUser.dto';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userRepo: Model<User>,
        private tokenService: TokensService) {    }

    async signin({rememberMe, ...signinDto}: SigninUserDto) {

        const findUserByUsername = await this.userRepo.findOne({username: signinDto.usernameOrEmail});

        if(!findUserByUsername) {
            const findUserByEmail = await this.userRepo.findOne({ email: signinDto.usernameOrEmail});
            if(!findUserByEmail) {
                throw new HttpException('Not found user!', 400);
            }
            const [storageSalt, storageHashPassword] = findUserByEmail.password.split('.')
            
            signinDto.password = await bcrypt.hash(signinDto.password, storageSalt);
            
            if(storageHashPassword !== signinDto.password) {
                throw new HttpException('Password and email incorrect!', 400)
            }
            if(!rememberMe) {
                return findUserByEmail;
            } else {
                const accessToken = this.tokenService.generatedTokens(process.env.SECRETACCESSTOKEN, new StructurToken(findUserByEmail._id, findUserByEmail.username))
                const refreshToken = this.tokenService.generatedTokens(process.env.SECRETREFRESHTOKEN, new StructurToken(findUserByEmail._id, findUserByEmail.username));

                this.tokenService.saveTokenInDB(findUserByEmail._id, refreshToken);
    
                return {
                    findUserByEmail,
                    accessToken
                }
            }

        } 
        const [storageSalt, storageHashPassword] = findUserByUsername.password.split('.')
        
        signinDto.password = await bcrypt.hash(signinDto.password, storageSalt);

        if(storageHashPassword !== signinDto.password) {
            throw new HttpException('Password and email incorrect!', 400)
        }
        if(!rememberMe) {
            return findUserByUsername;
        } else {
            const accessToken = this.tokenService.generatedTokens(process.env.SECRETACCESSTOKEN, new StructurToken(findUserByUsername._id, findUserByUsername.username))
            const refreshToken = this.tokenService.generatedTokens(process.env.SECRETREFRESHTOKEN, new StructurToken(findUserByUsername._id, findUserByUsername.username))

            this.tokenService.saveTokenInDB(findUserByUsername._id, refreshToken);

            return {
                findUserByUsername,
                accessToken
            }
        }
    }

    async signup({rememberMe, ...signupDto}: SignupUserDto) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(signupDto.password, salt);
            
            const resultPass = salt + "." + hash;
            signupDto.password = resultPass;
    
            const user = await new this.userRepo(signupDto)
    
            if(rememberMe) {
                const accessToken = this.tokenService.generatedTokens(process.env.SECRETACCESSTOKEN, new StructurToken(user._id, user.username))
                const refreshToken = this.tokenService.generatedTokens(process.env.SECRETREFRESHTOKEN, new StructurToken(user._id, user.username))
    
                this.tokenService.saveTokenInDB(user._id, refreshToken);
    
    
                const saveUser = await user.save()
                return {
                    saveUser,
                    accessToken
                }
            } else {
                return user.save();
            }
        } catch(err) {
            return err
        }
        
    }

    updateToken(accessToken: string) {
        const {userID, ...tokenInfo} = this.tokenService.decodedToken(accessToken);
        const refreshToken = this.tokenService.findByUserId(userID);
        return this.tokenService.updateAccessToken(process.env.SECRETACCESSTOKEN, refreshToken);
    }
}