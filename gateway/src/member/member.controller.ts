import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDTO } from './dto/create-member.dto';
import { UpdateMemberDTO } from './dto/update-member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  getMembers() {
    return this.memberService.getMember();
  }

  @Post()
  createMember(@Body() data: CreateMemberDTO) {
    return this.memberService.createMember(data);
  }

  @Patch(':membershipId')
  updateMemberById(
    @Param('membershipId') membershipId: string,
    @Body() data: UpdateMemberDTO,
  ) {
    return this.memberService.updateMemberById(membershipId, data);
  }

  @Get(':membershipId')
  getMemberById(@Param('membershipId') membershipId: string) {
    return this.memberService.getMemberById(membershipId);
  }
}
