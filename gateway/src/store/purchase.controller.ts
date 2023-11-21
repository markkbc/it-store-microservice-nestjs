import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PurchaseProductDTO } from './dto/purchase-product.dto';
import { PurchaseService } from './purchase.service';

@Controller('products/purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get('membership/:membershipId')
  getProductPurchasedByMembershipId(
    @Param('membershipId') membershipId: string,
  ) {
    return this.purchaseService.getProductPurchasedByMembershipId(membershipId);
  }

  @Post()
  purchaseProduct(@Body() data: PurchaseProductDTO) {
    return this.purchaseService.purchaseProduct(data);
  }
}
