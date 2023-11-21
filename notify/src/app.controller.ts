import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { SendEmail } from './interface/send-email.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'post/notify' })
  getHello(@Payload() data: SendEmail) {
    return this.appService.sendEmail(data);
  }
}
