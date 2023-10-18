import "reflect-metadata";
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import connectDB from './db';
import { MovieResolver } from './resolvers/movieResolver';
import { GenreResolver } from './resolvers/genreResolver';
import { ActorResolver } from './resolvers/actorResolver';
import { UserResolver } from './resolvers/userResolver';
import { UserActivityResolver } from './resolvers/userActivityResolver';
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";

import * as dotenv from 'dotenv'
import Context from "./types/context";
import { verifyJwt } from "./utils/jwt";
import { User } from "./types/user";

async function startServer() {
    dotenv.config()
    const app = express();

    const schema = await buildSchema({
        resolvers: [GenreResolver, ActorResolver, MovieResolver, UserResolver, UserActivityResolver],
    });

    const server = new ApolloServer({
        schema,
        context: (ctx: Context) => {
            const context = ctx;

            if (ctx.req?.cookies?.accessToken) {
                const user = verifyJwt<User>(ctx.req.cookies.accessToken);
                context.user = user;
            }
            return context;
        },
    });

    await connectDB();

    await server.start();

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`Server is running at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();
