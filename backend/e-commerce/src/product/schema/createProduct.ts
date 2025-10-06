import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/schema/createCategory';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class createProduct extends Document {
  @Prop({ default: () => uuidv4() })
  declare _id: string;

  @Prop()
  image: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop({ type: String, ref: Category.name, required: true })
  category: string;

  @Prop()
  description: string;

  @Prop()
  ratings: string;
}

export const createProductSchema = SchemaFactory.createForClass(createProduct);
