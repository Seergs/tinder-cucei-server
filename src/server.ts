import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import express from "express";

import UserResolver from "./resolvers/userResolver";

const PORT = 5000;

async function main() {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: true,
  });

  const server = new ApolloServer({
    schema,
  });

  const app = express();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch((e) => console.log(e));
