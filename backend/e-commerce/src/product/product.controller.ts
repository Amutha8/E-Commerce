import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from './dto/createProductDto';
import { updateProductDto } from './dto/updateProductDto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProducts: createProductDto) {
    return this.productService.create(createProducts);
  }
@Get('/by-category')
  async findAlll(@Query('categoryId') categoryId?: string) {
    console.log(categoryId);
    
    if (categoryId) {
      return this.productService.findByCategory(categoryId);
    }
    return this.productService.findAll();
  }
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: updateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  
}
