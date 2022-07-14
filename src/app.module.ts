import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule],
  providers: [AppService],
})
export class AppModule {}
