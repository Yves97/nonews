import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, MailModule],
  providers: [AppService],
})
export class AppModule {}
