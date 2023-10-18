import ActorModel from "../models/actorModel";
import { CreateActorInput } from "../types/actor";

class ActorService {
    async findActors() {
        return ActorModel.find().lean();
    }

    async createActor(input: CreateActorInput) {
        return ActorModel.create(input);
    }
}

export default ActorService;
