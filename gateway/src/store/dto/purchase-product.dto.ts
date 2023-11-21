import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PurchaseProductDTO {
  @IsString()
  @IsNotEmpty()
  membershipId: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  productId: string;
}
