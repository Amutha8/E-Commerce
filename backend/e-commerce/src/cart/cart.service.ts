import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCartDto } from './dto/createCartDto';
import { UpdateCartDto } from './dto/updateCartDto';
import { Cart } from './schema/cartSchema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async addToCart(createCartDto: CreateCartDto): Promise<Cart> {
    const { userId, productId, quantity } = createCartDto;

    let cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      cart = new this.cartModel({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    return cart.save();
  }

  async getCartByUser(userId: string): Promise<Cart> {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.productId')
      .exec();

    if (!cart) throw new NotFoundException(`Cart for user ${userId} not found`);
    return cart;
  }

  async updateCartItem(userId: string, productId: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) throw new NotFoundException('Cart not found');

    const item = cart.items.find(
      (i) => i.productId.toString() === productId,
    );
    if (!item) throw new NotFoundException('Product not found in cart');

    item.quantity = updateCartDto.quantity;
    return cart.save();
  }

  async removeCartItem(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId,
    );
    return cart.save();
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = [];
    return cart.save();
  }
}
