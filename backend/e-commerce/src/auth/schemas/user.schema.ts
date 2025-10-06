import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enum/role.enum';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ default: () => uuidv4() })
  declare _id: string;

  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  dept: string;

  @Prop()
  rollno: string;

  @Prop()
  age: string;

  @Prop()
  address: string;

  @Prop()
  phno: string;

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.User],
  })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
