import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, MailModule, CategoryModule],
  providers: [AppService],
})
export class AppModule {}
