import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/auth/schemas/user.schema';
import { createProduct } from 'src/product/schema/createProduct';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ default: () => uuidv4() })
  declare _id: string;

  @Prop({ type: String, ref: User.name, required: true })
  userId: string;

  @Prop([
    {
      productId: { type: String, ref: createProduct.name, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }, 
    },
  ])
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'pending' })
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

  @Prop()
  paymentMethod: string;

  @Prop()
  shippingAddress: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
