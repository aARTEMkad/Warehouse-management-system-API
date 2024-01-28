import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum RolesUser {
    Admin = 'Admin',
    User = 'User'
}

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true})
    lastName: string;

    @Prop({ required: true, unique: true})
    email: string;

    @Prop({ required: true})
    birthDay: string;

    @Prop({ required: true })
    roles: RolesUser

    @Prop()
    createdAt: string;

    @Prop()
    updateAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);