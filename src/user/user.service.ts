import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserRole } from './user.role.enum';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './user-jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService : JwtService
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const newUser = new User()
        newUser.firstname = createUserDto.firstname
        newUser.lastname = createUserDto.lastname
        newUser.email = createUserDto.email
        newUser.job = createUserDto.job
        newUser.phone = createUserDto.phone
        newUser.role = createUserDto.role || UserRole.BLOGGER
        newUser.salt = await bcrypt.genSalt()
        newUser.password = await this.hashPassword(createUserDto.password,newUser.salt)

        const create = await this.userRepository.create(newUser)

        try {
            await this.userRepository.save(newUser)
            return create;
        } catch (error) {
            if(error.code === "23505"){
                throw new ConflictException('Utilisateur deja existant')
            }
            else if(error.code === "22P02"){
                throw new ConflictException(`Role invalide, doit contenir ${UserRole.BLOGGER} ou ${UserRole.ADMIN}`)
            }
            else{
                throw new InternalServerErrorException()
            }
        }
    }

    async loginUser(userDto: CreateUserDto): Promise<{accessToken: string}>{
        const user = await this.validateUserPassword(userDto)
        if(!user){
            throw new UnauthorizedException('Mot de passe ou e-mail introuvable')
        }
        const jwtPayload : JwtPayload = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            job: user.job,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
        const accessToken = await this.jwtService.sign(jwtPayload);
        return {accessToken};
    }

    async getUser(id: number): Promise<User>{
        const user = await this.userRepository.findOne(id)
        if(!user){
            throw new NotFoundException('User Not Found')
        }
        return user
    }

    async validateUserPassword(userDto: CreateUserDto){
        const {email,password} = userDto
        const user = await this.userRepository.findOne({email})
        if(user && await user.validatePassword(password)){
            return user;
        }else return null
    }

    private async hashPassword(password: string,salt: string): Promise<string>{
        return bcrypt.hash(password,salt)
    }
}
