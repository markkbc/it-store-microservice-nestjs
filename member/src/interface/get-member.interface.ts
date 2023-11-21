import { Member } from 'src/entities/member.entity';

export interface IGetMember extends Pick<Member, 'membershipId'> {}
