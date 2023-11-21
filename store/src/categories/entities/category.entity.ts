import { Categories } from '@prisma/client';

export class CategoryEntity implements Categories {
  id: number;
  name: string;
}
