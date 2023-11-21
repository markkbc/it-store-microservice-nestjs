import { Member } from 'src/entities/member.entity';

export interface IUpdateMember extends Omit<Member, 'createdAt'> {}
