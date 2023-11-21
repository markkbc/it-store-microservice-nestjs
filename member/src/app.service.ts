import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Member } from './entities/member.entity';
import { ICreateMember } from './interface/create-member.interface';
import { IUpdateMember } from './interface/update-member.interface';

const members: Member[] = [
  {
    membershipId: '123456',
    firstname: 'firstname',
    lastname: 'lastname',
    phoneNo: '0888888888',
    email: 'test1@test.com',
    dob: new Date('2015-03-25'),
    createdAt: new Date('2015-03-25'),
  },
  {
    membershipId: '234567',
    firstname: 'firstname',
    lastname: 'lastname',
    phoneNo: '0888888888',
    email: 'test2@test.com',
    dob: new Date('2010-03-25'),
    createdAt: new Date('2015-03-25'),
  },
  {
    membershipId: '345678',
    firstname: 'firstname',
    lastname: 'lastname',
    phoneNo: '0888888888',
    email: 'test3@test.com',
    dob: new Date('2005-03-25'),
    createdAt: new Date('2015-03-25'),
  },
];

@Injectable()
export class AppService {
  getMembers() {
    return members;
  }

  getMemberByMembershipId(membershipId: string) {
    const member = members.find(
      (member) => member.membershipId === membershipId,
    );
    if (!member) {
      throw new NotFoundException('member not found');
    }
    return member;
  }

  createMember(data: ICreateMember) {
    const member = { ...data, membershipId: uuidv4(), createdAt: new Date() };
    members.push(member);
    return member;
  }

  updateMember({ membershipId, ...data }: IUpdateMember) {
    const memberIndex = members.findIndex(
      (m) => m.membershipId === membershipId,
    );
    if (memberIndex < 0) {
      throw new NotFoundException('member not found');
    }
    members[memberIndex] = {
      ...members[memberIndex],
      ...data,
    };
    return members[memberIndex];
  }
}
