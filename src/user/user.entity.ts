import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRole } from "./user.role.enum";
import * as bcrypt from 'bcrypt';


@Entity()
@Unique(['email','phone'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    job: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({
        type : 'enum',
        enum : UserRole,
        default : UserRole.BLOGGER
    })
    role: UserRole

    @Column()
    avatar: string;

    @Column()
    status: number;

    @CreateDateColumn()
    createdDate : Date;

    async validatePassword(password: string):Promise<boolean>{
        const isPasswordMatched = await bcrypt.compare(password,this.password)
        return isPasswordMatched;
    }
}