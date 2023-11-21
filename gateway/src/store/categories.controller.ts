import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Get('best-seller')
  getCategoryBestSeller() {
    return this.categoryService.getCategoryBestSeller();
  }
}
