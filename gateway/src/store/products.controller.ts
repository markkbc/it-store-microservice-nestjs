import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationParams } from 'src/utils/pagination.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getProducts(@Query() pagination: PaginationParams) {
    return this.productService.getProducts(pagination);
  }

  @Get('best-seller')
  getProductBestSeller() {
    return this.productService.getProductBestSeller();
  }

  @Get('category/:id')
  getProductsByCategoryId(@Param('id') id: number) {
    return this.productService.getProductsByCategoryId(id);
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }
}
