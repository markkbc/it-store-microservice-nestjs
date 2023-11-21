import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationParams } from 'src/utils/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('STORE_SERVICE') private readonly storeClient: ClientProxy,
  ) {}

  getProducts(pagination: PaginationParams) {
    return this.storeClient.send({ cmd: 'get/products' }, pagination);
  }

  async getProduct(id: number) {
    try {
      return await this.storeClient
        .send({ cmd: 'get/products/id' }, { id })
        .toPromise();
    } catch (err) {
      throw new NotFoundException('product not found');
    }
  }

  async getProductsByCategoryId(id: number) {
    try {
      return await this.storeClient
        .send({ cmd: 'get/products/category/id' }, { id })
        .toPromise();
    } catch (err) {
      throw new NotFoundException('product in cateogry not found');
    }
  }

  getProductBestSeller() {
    return this.storeClient.send({ cmd: 'get/products/best-seller' }, {});
  }
}
