import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Address, AddressDocument } from "./address.schema";
import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { Designation } from "./designation.schema";

@Schema({ timestamps: true })
export class User {

    @Prop()
    @IsString()
    @IsOptional()
    name?: string;

    @Prop({ required: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Prop({ select: false })
    @IsString()
    @IsOptional()
    password?: string;

    @Prop()
    @IsOptional()
    @ValidateNested()
    @Type(() => Address)
    address?: Address;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Designation" }] })
    @IsOptional()
    designation?: Designation[];

    @Prop({ default: false })
    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);