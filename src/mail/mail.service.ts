import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}



    async sendWelcome(user: User){
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Bienvenu(e)!',
            template: 'welcome',
            context: {
                firstname: user.firstname,
                lastname: user.lastname,
                date: user.createdDate
            }
        })
    }
}
