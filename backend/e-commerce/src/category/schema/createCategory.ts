import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ default: () => uuidv4() })
  declare _id: string;

  @Prop()
  image:string;
  
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
