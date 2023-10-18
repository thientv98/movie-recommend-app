import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import { CreateUserInput, LoginInput, User } from '../types/user';
import UserModel from '../models/userModel';
import UserService from '../services/user.service';
import Context from '../types/context';

@Resolver(User)
export class UserResolver {

    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Query(() => User)
    async getUser(@Arg('id') id: string) {
        const user = await UserModel.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }

    @Mutation(() => User)
    async createUser(
        @Arg("input") input: CreateUserInput,
    ) {
        return this.userService.createUser({ ...input });
    }

    @Mutation(() => String)
    login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
        return this.userService.login(input, context);
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() context: Context) {
        return context.user;
    }
}
