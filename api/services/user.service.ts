import UserModel from "../models/userModel";
import { CreateUserInput } from "../types/user";

class UserService {

    async createUser(input: CreateUserInput) {
        return UserModel.create(input);
    }
}

export default UserService;
