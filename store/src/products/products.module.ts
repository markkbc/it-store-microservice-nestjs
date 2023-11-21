import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ReceiptsService } from './receipts.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ReceiptsService, PrismaService],
  exports: [ReceiptsService],
})
export class ProductsModule {}
