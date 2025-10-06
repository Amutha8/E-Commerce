import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { createProduct, createProductSchema } from './schema/createProduct';

@Module({
  imports: [MongooseModule.forFeature([{ name: createProduct.name, schema: createProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
