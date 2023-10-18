import { pre, index } from '@typegoose/typegoose';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectType, Field, ID, InputType } from 'type-graphql';

@index({ email: 1 })
@ObjectType()
export class User {
    @Field((type) => ID)
    _id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => String, { nullable: true })
    avatar: string;
}

@InputType()
export class CreateUserInput {
    @IsString()
    @Field(() => String)
    name: string;

    @IsEmail()
    @Field()
    email: string;

    @MinLength(6, {
        message: "password must be at least 6 characters long",
    })
    @MaxLength(50, {
        message: "password must not be longer than 50 characters",
    })
    @Field(() => String, { nullable: false })
    password: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    avatar?: string;
}

@InputType()
export class LoginInput {
    @IsString()
    @Field(() => String)
    email: string;

    @IsString()
    @Field(() => String)
    password: string;
}
