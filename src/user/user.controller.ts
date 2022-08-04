import { Body, Controller, Get, Post, UseGuards, ValidationPipe, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from './roles.guards';
import { UserRole } from './user.role.enum';
import { Express } from 'express';
import {diskStorage} from 'multer'
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('auth')
export class UserController {

    constructor(private userService : UserService){}

    @UseInterceptors(FileInterceptor('avatar',{
        storage : diskStorage({
            destination : './files',
            filename: (req,file,cb)=>{
                const name = file.originalname.split('.')[0]
                const fileExtension = file.originalname.split('.')[1]
                const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension

                cb(null,newFileName)
            }
        }),
        fileFilter : (req,file,cb) => {
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
                return cb(null,false)
            }
            cb(null,true)
        }
    }))
    
    @Post('/register')
    async createUser(@Body(ValidationPipe) createUserDto : CreateUserDto, @UploadedFile() avatar: Express.Multer.File):Promise<User|{}>{
        const newUser = await this.userService.createUser(createUserDto,avatar)
        if(newUser){
            newUser.password = undefined
            newUser.salt = undefined
        }
        return {
            message : 'User Created',
            user : newUser
        }
    }
    
    @Get('pictures/:filepath')
    async picture(@Param('filepath') avatar,@Res() res){
        return await res.sendFile(avatar,{root : './files'})
    }

    @Post('/login')
    async loginUser(@Body() createUserDto : CreateUserDto): Promise<{accessToken: string}>{
        return await this.userService.loginUser(createUserDto)
    }

    @UseGuards(AuthGuard())
    @Get('user/:id')
    async getUser(id: number): Promise<User>{
        return this.userService.getUser(id)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    @Get('users')
    async getUsers(): Promise<User[]>{
        const users = await this.userService.getUsers()
        var finalUsers = []
        users.map((item)=>{
            delete item.password
            delete item.salt
            finalUsers.push(item) 
        })
        return finalUsers
    }
}
