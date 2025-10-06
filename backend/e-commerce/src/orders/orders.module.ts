import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/orderSchema';
import { UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), 
            MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
