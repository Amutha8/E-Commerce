import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createProduct } from './schema/createProduct';
import { updateProductDto } from './dto/updateProductDto';
import { createProductDto } from './dto/createProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(createProduct.name) private productModel: Model<createProduct>,
  ) {}

  async create(createProductDto: createProductDto): Promise<createProduct> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<createProduct[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<createProduct> {
    const product = await this.productModel.findById(id).exec();
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async update(
    id: string,
    updateProductDto: updateProductDto,
  ): Promise<createProduct> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updated)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<createProduct> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleted)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return deleted;
  }

  async findByCategory(category: string) {
    return this.productModel.find({ category }).exec();
  }
}
