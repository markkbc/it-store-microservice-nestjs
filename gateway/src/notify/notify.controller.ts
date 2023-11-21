import { Body, Controller, Post } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { SendEmailDTO } from './dto/send-email.dto';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post()
  createMember(@Body() data: SendEmailDTO) {
    return this.notifyService.sendNotify(data);
  }
}
