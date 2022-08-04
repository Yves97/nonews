import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './jwt-strategy';
import { jwtContants } from './constants';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports : [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret : jwtContants.secret,
            signOptions : {
                expiresIn : 3600
            }
        }),
        PassportModule.register({defaultStrategy : 'jwt'}),
        MailModule
    ],
    controllers : [UserController],
    providers : [UserService,JwtStrategy],
    exports: [
        JwtStrategy,
        PassportModule
    ]
})
export class UserModule {}
