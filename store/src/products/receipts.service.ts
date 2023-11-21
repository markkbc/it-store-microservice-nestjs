import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductEntity } from './entities/product.entity';
import { BestSeller } from 'src/utils/models';

@Injectable()
export class ReceiptsService {
  constructor(private readonly prisma: PrismaService) {}

  async purchase(product: ProductEntity, membershipId: string) {
    return await this.prisma.receipts.create({
      data: {
        title: product.name,
        total: product.price,
        productId: product.id,
        categoryId: product.categoryId,
        membershipId,
      },
    });
  }

  async getIdBestSeller(type: BestSeller, membershipId?: string) {
    const where = {
      createdAt: {
        gte: this.in30Days(),
      },
    };
    if (membershipId) {
      where['membershipId'] = membershipId;
    }
    const products = await this.prisma.receipts.groupBy({
      by: [type],
      _count: {
        productId: true,
      },
      where,
      orderBy: {
        _count: {
          [type]: 'desc',
        },
      },
    });
    return products[0][type];
  }

  async getProductIdByCategoryIdAndMembershipId(
    categoryId: number,
    membershipId: string,
  ) {
    const receipts = await this.prisma.receipts.findMany({
      distinct: ['productId'],
      where: {
        categoryId,
        membershipId,
        createdAt: {
          gte: this.in30Days(),
        },
      },
    });
    return receipts.map((receipt) => receipt.productId);
  }

  async productByMembershipId(membershipId: string) {
    const products = await this.prisma.receipts.findMany({
      where: {
        membershipId,
      },
      select: {
        product: true,
      },
    });
    return products.map((product) => product.product);
  }

  in30Days() {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - 30));
  }
}
