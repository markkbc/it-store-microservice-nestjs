import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ReceiptsService } from 'src/products/receipts.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ReceiptsService, PrismaService],
})
export class CategoriesModule {}
