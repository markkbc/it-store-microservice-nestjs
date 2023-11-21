import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ReceiptsService } from './products/receipts.service';

@Module({
  imports: [CategoriesModule, ProductsModule],
  controllers: [],
  providers: [PrismaService, ReceiptsService],
})
export class AppModule {}
