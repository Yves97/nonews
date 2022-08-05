import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';
import { UserRole } from '../user.role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class CreateUserDto {

    
    @IsString()
    @IsNotEmpty()
    firstname: string;

    
    @IsString()
    @IsNotEmpty()
    lastname: string;

    
    @IsString()
    @IsNotEmpty()
    job: string;

    
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    
    @IsNotEmpty()
    @IsString()
    phone: string;

    
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        default: UserRole.BLOGGER,
        enum: [UserRole.ADMIN,UserRole.BLOGGER]
    })
    role : UserRole;

    // @IsNotEmpty()
    // @IsString()
    // avatar: string;

    @ApiProperty({
        description: 'The status of user, blocked or not',
        default: 1
    })
    status: number;

    // @ApiProperty({
    //     type:
    // })
    avatar: string;
}