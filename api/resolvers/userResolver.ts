import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { CreateUserInput, User } from '../types/user';
import UserModel from '../models/userModel';
import UserService from '../services/user.service';

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

    @Query(() => [User])
    async getAllUsers() {
        return UserModel.find();
    }

    @Mutation(() => User)
    async createUser(
        @Arg("input") input: CreateUserInput,
    ) {
        return this.userService.createUser({ ...input });
    }
}
