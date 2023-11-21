import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { IGetMember } from './interface/get-member.interface';
import { ICreateMember } from './interface/create-member.interface';
import { IUpdateMember } from './interface/update-member.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get/member' })
  getMembers() {
    return this.appService.getMembers();
  }

  @MessagePattern({ cmd: 'get/member/id' })
  getMember(@Payload() { membershipId }: IGetMember) {
    return this.appService.getMemberByMembershipId(membershipId);
  }

  @MessagePattern({ cmd: 'post/member' })
  createMember(@Payload() data: ICreateMember) {
    return this.appService.createMember(data);
  }

  @MessagePattern({ cmd: 'patch/member' })
  updateMember(@Payload() data: IUpdateMember) {
    return this.appService.updateMember(data);
  }
}
