import { InputType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateBookInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field({ nullable: true })
    @IsString()
    description?: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    author: string;
}
