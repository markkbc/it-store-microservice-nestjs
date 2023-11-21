import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMemberDTO } from './dto/create-member.dto';
import { UpdateMemberDTO } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MEMBER_SERVICE') private readonly memberClient: ClientProxy,
  ) {}

  getMember() {
    return this.memberClient.send({ cmd: 'get/member' }, {});
  }

  async getMemberById(membershipId: string) {
    try {
      return await this.memberClient
        .send({ cmd: 'get/member/id' }, { membershipId })
        .toPromise();
    } catch (err) {
      throw new NotFoundException('member not found');
    }
  }

  async createMember(data: CreateMemberDTO) {
    try {
      return await this.memberClient
        .send({ cmd: 'post/member' }, data)
        .toPromise();
    } catch (err) {
      throw new NotFoundException('member not found');
    }
  }

  async updateMemberById(membershipId, data: UpdateMemberDTO) {
    try {
      return await this.memberClient
        .send({ cmd: 'patch/member' }, { ...data, membershipId })
        .toPromise();
    } catch (err) {
      throw new NotFoundException('member not found');
    }
  }
}
