import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/createCartDto';
import { UpdateCartDto } from './dto/updateCartDto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addToCart(createCartDto);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCartByUser(userId);
  }

  @Put(':userId/:productId')
  updateCartItem(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCartItem(userId, productId, updateCartDto);
  }

  @Delete(':userId/:productId')
  removeCartItem(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeCartItem(userId, productId);
  }

  @Delete(':userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
