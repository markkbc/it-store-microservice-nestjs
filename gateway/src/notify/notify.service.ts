import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendEmailDTO } from './dto/send-email.dto';

@Injectable()
export class NotifyService {
  constructor(
    @Inject('NOTIFY_SERVICE') private readonly notifyClient: ClientProxy,
  ) {}

  sendNotify(data: SendEmailDTO) {
    return this.notifyClient.send({ cmd: 'post/notify' }, data);
  }
}
