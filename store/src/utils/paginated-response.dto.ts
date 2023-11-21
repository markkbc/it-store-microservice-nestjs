import { plainToInstance } from 'class-transformer';
import type { ClassConstructor } from 'class-transformer';

export class PaginatedResponseDto<Item> {
  total: number;

  data: Item[];

  static create<Item>(
    model: ClassConstructor<Item>,
    { total, data }: { total: number; data: Item[] },
  ) {
    const dto = new PaginatedResponseDto<Item>();

    dto.data = plainToInstance(model, data);
    dto.total = total;

    return dto;
  }
}
