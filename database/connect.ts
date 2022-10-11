import { config } from 'dotenv-safe';
import postgres from 'postgres';

// This loads all evn variables from a .env file for all code after this line
if (!process.env.FLY_IO_BUILD) config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database

function connectOneTimeToDatabase() {
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres({
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }
  return globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
