import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Goods } from "src/goods/Schemas/goods.schema";


@Schema()
export class Procuder {
    @Prop({ required: true, unique: true })
    Name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goods' }] })
    Goods: Goods[];
}

export const ProcuderSchema = SchemaFactory.createForClass(Procuder);