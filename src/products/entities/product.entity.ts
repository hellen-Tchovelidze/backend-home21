import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
})
author: mongoose.Schema.Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product);
