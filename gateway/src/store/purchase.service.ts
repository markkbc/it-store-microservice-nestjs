import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PurchaseProductDTO } from './dto/purchase-product.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('STORE_SERVICE') private readonly storeClient: ClientProxy,
  ) {}

  getProductBestSeller() {
    return this.storeClient.send({ cmd: 'get/products/best-seller' }, {});
  }

  async purchaseProduct(data: PurchaseProductDTO) {
    try {
      return await this.storeClient
        .send({ cmd: 'post/products/purchase' }, data)
        .toPromise();
    } catch (err) {
      throw new NotFoundException('product not found');
    }
  }

  getProductPurchasedByMembershipId(membershipId: string) {
    return this.storeClient.send(
      { cmd: 'get/products/purchase/membership/id' },
      { membershipId },
    );
  }
}
