import { Products } from '@prisma/client';
import { CategoryEntity } from 'src/categories/entities/category.entity';

export class ProductEntity implements Products {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  categoryId: number;
  category: CategoryEntity;
}
