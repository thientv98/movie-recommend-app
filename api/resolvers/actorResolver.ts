import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { Actor, CreateActorInput } from '../types/actor';
import ActorModel from '../models/actorModel';
import ActorService from '../services/actor.service';

@Resolver(Actor)
export class ActorResolver {
    constructor(private actorService: ActorService) {
        this.actorService = new ActorService();
    }

    @Query(() => Actor)
    async getActor(@Arg('id') id: string) {
        const actor = await ActorModel.findById(id);
        if (!actor) throw new Error('Actor not found');
        return actor;
    }

    @Query(() => [Actor])
    async getActors() {
        return this.actorService.findActors();
    }

    @Mutation(() => Actor)
    async createActor(
        @Arg("input") input: CreateActorInput,
    ) {
        return this.actorService.createActor({ ...input });
    }
}
