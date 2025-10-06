import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/createOrderDto';
import { Order } from './schema/orderSchema';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class OrdersService {
 
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    console.log(createOrderDto.userId);;
    const user = await this.userModel
      .findOne({ _id: createOrderDto.userId })
      .exec();
    if (!user) throw new NotFoundException('User not found');

    const orderData = {
      ...createOrderDto,
      shippingAddress: user.address,
    };

    const order = new this.orderModel(orderData);
    return order.save();
  }

  
  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('items.productId').exec();
  }

  
  async findByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).populate('items.productId').exec();
  }

  async updateStatus(
    id: string,
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  ): Promise<Order> {
    const order = await this.orderModel
      .findOneAndUpdate({ id }, { status }, { new: true })
      .exec();
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException('Order not found');
  }
}
