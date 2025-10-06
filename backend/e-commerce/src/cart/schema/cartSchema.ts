import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { createProduct } from 'src/product/schema/createProduct';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ default: () => uuidv4() })
  declare _id: string;

  @Prop({ type: String, ref: User.name, required: true })
  userId: string;

  @Prop([
    {
      productId: { type: String, ref: createProduct.name, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ])
  items: {
    productId: string;
    quantity: number;
  }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
