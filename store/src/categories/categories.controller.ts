import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @MessagePattern({ cmd: 'get/categories' })
  getCategories(): Promise<CategoryEntity[]> {
    return this.categoryService.getCategories();
  }

  @MessagePattern({ cmd: 'get/categories/best-seller' })
  getCategoryBestSeller() {
    return this.categoryService.getCategoryBestSeller();
  }
}
