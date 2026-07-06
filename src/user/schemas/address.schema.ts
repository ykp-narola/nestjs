import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsOptional, IsString } from "class-validator";

@Schema()
export class Address {
    @Prop()
    @IsString()
    @IsOptional()
    street: string;

    @Prop()
    @IsString()
    @IsOptional()
    city: string;

    @Prop()
    @IsString()
    @IsOptional()
    state: string;

    @Prop()
    @IsString()
    @IsOptional()
    zip: string;
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);