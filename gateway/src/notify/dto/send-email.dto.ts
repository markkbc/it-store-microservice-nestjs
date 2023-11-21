import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDTO {
  @IsString()
  @IsNotEmpty()
  html: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsEmail()
  @IsNotEmpty()
  receiver: string;
}
