import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    default: null,
  })
  payzeCustomerId: string | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  })
  products: mongoose.Types.ObjectId;
}

export const userSchema = SchemaFactory.createForClass(User);
