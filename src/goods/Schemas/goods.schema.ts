import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";




@Schema()
export class Goods {

    @Prop({ required: true, maxlength: 40, unique: true })
    Name: string;

    @Prop({ required: true, unique: true })
    CodeGoods: string;

    @Prop({ required: true })
    Category: string;
    
    @Prop({ required: true })
    Procuder: string;

    @Prop({ maxlength: 600 })
    ProductDescription: string;

    @Prop({ required: false })
    CountInWarehouse: number;

    @Prop({ required: false })
    PriceBuy: number;

    @Prop({ required: false})
    PriceSell: number;  

    @Prop({ required: true, unique: true })
    SerialNumbers: string;
}

export const GoodsSchema = SchemaFactory.createForClass(Goods);