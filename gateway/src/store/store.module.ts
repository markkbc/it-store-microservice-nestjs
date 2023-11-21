import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ProductsService } from './products.service';
import { CategoriesService } from './categories.service';
import { ProductController } from './products.controller';
import { CategoriesController } from './categories.controller';
import { PurchaseController } from './purchase.controller';

@Module({
  controllers: [ProductController, CategoriesController, PurchaseController],
  providers: [ProductsService, CategoriesService, PurchaseService],
})
export class StoreModule {}
