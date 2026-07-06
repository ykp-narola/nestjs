import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsEmail } from "class-validator";

@Schema({ timestamps: true })
export class Student {
    @Prop({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Prop({ required: true })
    @IsInt()
    @IsNotEmpty()
    age: number;

    @Prop()
    @IsEmail()
    @IsOptional()
    email?: string;
}

export type StudentDocument = Student & Document;
export const StudentSchema = SchemaFactory.createForClass(Student);
