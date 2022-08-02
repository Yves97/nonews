import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';
import { UserRole } from '../user.role.enum';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    firstname : string;

    @IsString()
    @IsNotEmpty()
    lastname : string;

    @IsString()
    @IsNotEmpty()
    job : string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email : string;

    @IsNotEmpty()
    @IsString()
    phone : string;

    @IsNotEmpty()
    @IsString()
    password : string;

    role : UserRole;

    // @IsNotEmpty()
    // @IsString()
    // avatar: string;
    status: number;
}