import UserActivityModel from "../models/userActivityModel";
import { SaveUserActivityInput } from "../types/userActivity";

class UserActivityService {
    async createActivity(input: SaveUserActivityInput) {
        return UserActivityModel.create(input);
    }
}

export default UserActivityService;