import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('STORE_SERVICE') private readonly storeClient: ClientProxy,
  ) {}

  getCategories() {
    return this.storeClient.send({ cmd: 'get/categories' }, {});
  }

  getCategoryBestSeller() {
    return this.storeClient.send({ cmd: 'get/categories/best-seller' }, {});
  }
}
