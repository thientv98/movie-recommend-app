import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { SaveUserActivityInput, UserActivity } from '../types/userActivity';
import UserActivityModel from '../models/userActivityModel';
import UserActivityService from '../services/userActivity.service';

@Resolver(UserActivity)
export class UserActivityResolver {
    constructor(private userActivityService: UserActivityService) {
        this.userActivityService = new UserActivityService();
    }

    @Query(() => UserActivity)
    async getUserActivity(@Arg('id') id: string) {
        const activity = await UserActivityModel.findById(id);
        if (!activity) throw new Error('User activity not found');
        return activity;
    }

    @Query(() => [UserActivity])
    async getAllUserActivities() {
        return UserActivityModel.find();
    }

    @Mutation(() => UserActivity)
    async createActivity(
        @Arg("input") input: SaveUserActivityInput,
    ) {
        return this.userActivityService.createActivity({ ...input });
    }
}
