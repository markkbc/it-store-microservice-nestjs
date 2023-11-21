import { Member } from 'src/entities/member.entity';

export interface ICreateMember
  extends Omit<Member, 'membershipId' | 'createdAt'> {}
