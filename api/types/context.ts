import { Request, Response } from "express";
import { User } from "./user";

interface Context {
    req: Request;
    res: Response;
    user: User | null;
}

export default Context;
