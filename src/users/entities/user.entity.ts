

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
}

export const userSchema = SchemaFactory.createForClass(User);
