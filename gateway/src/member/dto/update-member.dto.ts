import {
  IsEmail,
  IsISO8601,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateMemberDTO } from './create-member.dto';

export class UpdateMemberDTO implements CreateMemberDTO {
  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsNumberString()
  @IsOptional()
  phoneNo: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsISO8601()
  @IsOptional()
  dob: Date;
}
