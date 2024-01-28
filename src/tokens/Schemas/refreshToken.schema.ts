import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";



@Schema()
export class RefreshToken {
    
    @Prop({required: true, unique: true})
    userID: string;

    @Prop({required: true})
    refreshToken: string;

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);