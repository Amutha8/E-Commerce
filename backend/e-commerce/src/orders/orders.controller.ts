import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrderDto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('/user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.ordersService.findByUser(userId);
  }

  @Patch('/:id/status/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled') {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
