import { config } from "dotenv";
config();

import { createClient, client } from "../server/db/connection";
import {
  createContactsTableQuery,
  createDatabaseQuery,
  createUsersTableQuery,
  dropDatabase,
} from "./queries";

(async () => {
  {
    await createClient.connect();
    await createClient.query(dropDatabase);
    await createClient.query(createDatabaseQuery);
    await createClient.end();
  }

  {
    await client.connect();

    await client.query(`DROP SCHEMA IF EXISTS public CASCADE;`);
    await client.query(`CREATE SCHEMA IF NOT EXISTS public;`);

    await client.query(createUsersTableQuery);
    await client.query(createContactsTableQuery);

    await client.end();
  }
})();
