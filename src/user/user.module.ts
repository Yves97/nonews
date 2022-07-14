import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './jwt-strategy';

@Module({
    imports : [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret : "nonewsblog",
            signOptions : {
                expiresIn : 3600
            }
        }),
        PassportModule.register({defaultStrategy : 'jwt'})  
    ],
    controllers : [UserController],
    providers : [UserService,JwtStrategy],
    exports: [
        JwtStrategy,
        PassportModule
    ]
})
export class UserModule {}
