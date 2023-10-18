import { ApolloError } from "apollo-server-express";
import UserModel from "../models/userModel";
import Context from "../types/context";
import { CreateUserInput, LoginInput } from "../types/user";
import * as bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";

class UserService {

    async createUser(input: CreateUserInput) {

        const user = await this.findUserByEmail(input.email);

        if (user) {
            throw new Error('Email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hashSync(input.password, salt);

        const userData = {
            ...input,
            password
        }
        return UserModel.create(userData);
    }

    async findUserByEmail(email: string) {
        return UserModel.findOne({ email }).lean()
    }

    async login(input: LoginInput, context: Context) {
        const e = "Invalid email or password";

        // Get our user by email
        const user = await this.findUserByEmail(input.email);

        if (!user) {
            throw new ApolloError(e);
        }

        // validate the password
        const passwordIsValid = await bcrypt.compare(input.password, user.password || "");

        if (!passwordIsValid) {
            throw new ApolloError(e);
        }

        // sign a jwt
        const token = signJwt(user);

        // set a cookie for the jwt
        context.res.cookie("accessToken", token, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        // return the jwt
        return token;
    }
}

export default UserService;
