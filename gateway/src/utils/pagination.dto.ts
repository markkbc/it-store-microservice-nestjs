import { Type } from 'class-transformer';
import { IsNumber, Min, IsOptional, IsString } from 'class-validator';

export class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsString()
  query?: string = '';

  get offset(): number {
    return this.limit * (this.page - 1);
  }
}
