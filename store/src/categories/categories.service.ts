import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma.service';
import { CategoryEntity } from './entities/category.entity';
import { ReceiptsService } from 'src/products/receipts.service';
import { BestSeller } from 'src/utils/models';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly receiptService: ReceiptsService,
  ) {}
  async getCategories() {
    const response = await this.prisma.categories.findMany();
    return plainToInstance(CategoryEntity, response);
  }

  async getCategoryId(id: number) {
    const response = await this.prisma.categories.findUnique({ where: { id } });
    return plainToInstance(CategoryEntity, response);
  }

  async getCategoryBestSeller() {
    const categoryId = await this.receiptService.getIdBestSeller(
      BestSeller.Category,
    );
    return await this.getCategoryId(categoryId);
  }
}
