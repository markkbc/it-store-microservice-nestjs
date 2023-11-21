import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { SendEmail } from './interface/send-email.interface';

@Injectable()
export class AppService {
  async sendEmail({ receiver, subject, html }: SendEmail) {
    try {
      const transporter = await this.createMailTransport();
      const info = await transporter.sendMail({
        from: '"IT STORE" <noreply@test.com>',
        to: receiver,
        subject,
        html,
      });

      console.info('Message sent: %s', info.messageId);
      return true;
    } catch (error) {
      console.error(error, 'sendEmail');
      return false;
    }
  }

  createMailTransport() {
    return createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'dev@ar.fan',
        pass: 'b j w h l y r s v i o k o o g u',
      },
    });
  }
}
