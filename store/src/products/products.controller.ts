import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaginationParams } from 'src/utils/pagination.dto';
import { PaginatedResponseDto } from 'src/utils/paginated-response.dto';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';
import {
  IGetProduct,
  IGetProductByCategory,
} from './interface/get-product.interface';
import {
  IMembershipId,
  IPurchaseProduct,
} from './interface/purchase-product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @MessagePattern({ cmd: 'get/products' })
  getProducts(
    pagination: PaginationParams,
  ): Promise<PaginatedResponseDto<ProductEntity>> {
    return this.productService.getProducts(pagination);
  }

  @MessagePattern({ cmd: 'get/products/id' })
  getProduct({ id }: IGetProduct): Promise<ProductEntity> {
    return this.productService.getProduct(id);
  }

  @MessagePattern({ cmd: 'get/products/category/id' })
  getProductsByCategoryId({
    id,
  }: IGetProductByCategory): Promise<ProductEntity[]> {
    return this.productService.getProductsByCategoryId(id);
  }

  @MessagePattern({ cmd: 'get/products/purchase/membership/id' })
  getProductPurchasedByMembershipId({
    membershipId,
  }: IMembershipId): Promise<ProductEntity[]> {
    return this.productService.getProducPurchasedByMembershipId(membershipId);
  }

  @MessagePattern({ cmd: 'get/products/best-seller' })
  getProductBestSeller(): Promise<ProductEntity> {
    return this.productService.getProductBestSeller();
  }

  @MessagePattern({ cmd: 'post/products/purchase' })
  purchase(data: IPurchaseProduct) {
    return this.productService.purchaseProduct(data);
  }
}
