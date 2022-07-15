import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {

    constructor(private userService : UserService){}

    @Post('/register')
    async createUser(@Body(ValidationPipe) createUserDto : CreateUserDto):Promise<User|{}>{
        const newUser = await this.userService.createUser(createUserDto)
        if(newUser){
            newUser.password = undefined
            newUser.salt = undefined
        }
        return {
            message : 'User Created',
            user : newUser
        }
    }

    @Post('/login')
    async loginUser(@Body() createUserDto : CreateUserDto): Promise<{accessToken: string}>{
        return await this.userService.loginUser(createUserDto)
    }


    @UseGuards(AuthGuard())
    @Get(':id')
    async getUser(id: number): Promise<User>{
        return this.userService.getUser(id)
    }
}
