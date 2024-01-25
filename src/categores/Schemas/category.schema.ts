import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Goods } from "src/goods/Schemas/goods.schema";


@Schema()
export class Category {
    @Prop({ required: true, unique: true })
    Name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goods' }] })
    Goods: Goods[];
}

export const CaterogySchema = SchemaFactory.createForClass(Category);