import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
@ObjectType()
export class Book {

    @Field(() => ID)
    _id: string;

    @Prop({ required: true })
    @Field()
    title: string;

    @Prop()
    @Field({ nullable: true })
    description?: string;

    @Prop({ required: true })
    @Field()
    author: string;
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);