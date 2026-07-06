import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsNotEmpty, IsString } from "class-validator";

@Schema({ timestamps: true })
export class Designation {
    @Prop()
    @IsString()
    @IsNotEmpty()
    title: string;
}

export type DesignationDocument = Designation & Document;
export const DesignationSchema = SchemaFactory.createForClass(Designation);