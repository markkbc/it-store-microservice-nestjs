import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';
import { BestSeller } from 'src/utils/models';
import { PaginationParams } from 'src/utils/pagination.dto';
import { PaginatedResponseDto } from 'src/utils/paginated-response.dto';
import { ProductEntity } from './entities/product.entity';
import { ReceiptsService } from './receipts.service';
import { IPurchaseProduct } from './interface/purchase-product.interface';

type Member = {
  data: {
    firstname: string;
    lastname: string;
    email: string;
  };
};

// TODO: move to config
const API_URL = 'http://127.0.0.1:3000/';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly receiptService: ReceiptsService,
  ) {}

  async getProducts({ limit, offset, query, categoryId }: PaginationParams) {
    const where = {};
    if (query) {
      where['AND'] = [{ name: { contains: query, mode: 'insensitive' } }];
    }
    if (categoryId) {
      const whereCategory = { categoryId };
      if (where['AND']) {
        where['AND'].push(whereCategory);
      } else {
        where['AND'] = [whereCategory];
      }
    }
    const [data, total] = await Promise.all([
      this.prisma.products.findMany({
        where,
        skip: offset,
        take: limit,
        include: {
          category: true,
        },
      }),
      this.prisma.products.count({ where }),
    ]);

    return PaginatedResponseDto.create(ProductEntity, {
      total,
      data,
    });
  }

  async getProduct(id: number) {
    const data = await this.prisma.products.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('product not found');
    }
    return plainToInstance(ProductEntity, data);
  }

  async getProductsByCategoryId(id: number) {
    const data = await this.prisma.products.findMany({
      where: { categoryId: id },
    });
    if (data.length === 0) {
      throw new NotFoundException('product in cateogry not found');
    }
    return plainToInstance(ProductEntity, data);
  }

  async getProductBestSeller() {
    const productId = await this.receiptService.getIdBestSeller(
      BestSeller.Product,
    );
    return await this.getProduct(productId);
  }

  async getProducPurchasedByMembershipId(membershipId: string) {
    const products =
      await this.receiptService.productByMembershipId(membershipId);
    return plainToInstance(ProductEntity, products);
  }

  async purchaseProduct({ productId, membershipId }: IPurchaseProduct) {
    const product = await this.getProduct(productId);
    const purchase = await this.receiptService.purchase(product, membershipId);
    const categoryBestSellerId = await this.receiptService.getIdBestSeller(
      BestSeller.Category,
      membershipId,
    );
    const productIds =
      await this.receiptService.getProductIdByCategoryIdAndMembershipId(
        categoryBestSellerId,
        membershipId,
      );
    const productsSuggestion = await this.getProductsSuggestion(
      productIds,
      categoryBestSellerId,
    );
    if (productsSuggestion.length > 0) {
      const member: Member = await axios.get(
        `${API_URL}member/${membershipId}`,
      );
      let html = '';
      for (const item of productsSuggestion) {
        html += `<p>name:${item.name}</p><p>desction: ${item.description}</p><p>price: ${item.price}</p>`;
      }
      this.sendNotify(member.data.email, html);
    }
    return purchase;
  }

  async getProductsSuggestion(productIds: number[], categoryId: number) {
    return await this.prisma.products.findMany({
      where: {
        id: {
          notIn: productIds,
        },
        categoryId,
      },
    });
  }

  async sendNotify(email: string, html: string) {
    await axios.post(`${API_URL}notify`, {
      receiver: email,
      subject: 'Products suggestion',
      html,
    });
  }
}
