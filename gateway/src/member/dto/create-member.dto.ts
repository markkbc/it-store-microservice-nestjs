import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateMemberDTO {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumberString()
  @IsNotEmpty()
  phoneNo: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsISO8601()
  @IsNotEmpty()
  dob: Date;
}
