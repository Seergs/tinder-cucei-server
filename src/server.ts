import { config } from "dotenv";

config();

import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { verify } from "jsonwebtoken";

import UserResolver from "./resolvers/userResolver";
import PeopleResolver from "./resolvers/peopleResolver";
import User from "./entities/User";

const PORT = process.env.PORT || 5000;

async function main() {
  const connection = await createConnection();
  await connection.runMigrations();

  const schema = await buildSchema({
    resolvers: [UserResolver, PeopleResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      let user: User | null = null;
      const token = req.headers.authorization || null;
      console.log(`Found token ${token}`);

      if (!token) return { user };

      try {
        const jwt = token.split("Bearer ")[1];
        const userData: any = verify(jwt!, process.env.JWT_SECRET!);
        const dbUser = await User.findOneOrFail(userData.id);
        user = dbUser;
        return { user };
      } catch (e) {
        console.log(e);
        return { user };
      }
    },
  });

  const app = express();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch((e) => console.log(e));
