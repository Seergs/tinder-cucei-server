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
    formatError: (error) => {
      let errors: any = {};
      console.log(JSON.stringify(error, null, 2));
      if (error.message === "Argument Validation Error") {
        error?.extensions?.exception.validationErrors.forEach((e: any) => {
          errors[e.property] = Object.values(e.constraints)[0];
        });

        return {
          message: "Validation Error",
          errors,
        };
      }

      if (error.message == "User Input Error") {
        const errorKey = Object.keys(error?.extensions?.exception)[0];
        const errorValue = Object.values(error?.extensions?.exception)[0];
        return {
          message: "User Input Error",
          errors: {
            [errorKey!]: errorValue,
          },
        };
      }

      return {
        message: "Algo salió mal, intenta de nuevo más tarde",
        error,
      };
    },
  });

  const app = express();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
