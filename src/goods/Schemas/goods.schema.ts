import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";




@Schema()
export class Goods {

    @Prop({ required: true, maxlength: 40 })
    Name: string;

    @Prop({ required: true})
    CodeGoods: string;

    //@Prop()
    //Category: classCategory
    
    //@Prop()
    //Procuder: classProcuder

    @Prop({ maxlength: 600 })
    ProductDescription: string;

    @Prop({ required: false })
    CountInWarehouse: number;

    @Prop({ required: false })
    PriceBuy: number;

    @Prop({ required: false})
    PriceSell: number;  

    @Prop({ required: true })
    SerialNumbers: string;
}

export const GoodsSchema = SchemaFactory.createForClass(Goods);