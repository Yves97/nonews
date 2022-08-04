import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports : [
    MailerModule.forRoot({
      transport : {
        host : 'smtp.mailtrap.io',
        secure : false,
        port : 2525,
        auth: {
          user: '289d486488d553',
          pass: '981a77017bb278',
        },
      },
      defaults : {
        from: '"No Reply" <noreply@nonews.com>'
      },
      template : {
        dir : __dirname + '/templates',
        adapter : new HandlebarsAdapter(),
        options: { 
            strict : true,
      },
    },
    })
  ],
  providers: [MailService],
  exports : [MailService]
})
export class MailModule {}
