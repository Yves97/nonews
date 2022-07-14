import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';


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

}
