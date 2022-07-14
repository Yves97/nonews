import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    database : 'nonews',
    username : 'postgres',
    password : 'root',
    synchronize : true,
    entities : [__dirname + '/../**/*.entity{.ts,.js}'],
}