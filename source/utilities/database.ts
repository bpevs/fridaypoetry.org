import "dotenv";
import { Client } from "postgres";
import { Poem } from "../types.ts";

const client = new Client({
  database: Deno.env.get("DB_DATABASE"),
  hostname: Deno.env.get("DB_HOSTNAME"),
  password: Deno.env.get("DB_PASSWORD"),
  port: Deno.env.get("DB_PORT"),
  user: Deno.env.get("DB_USER"),
});

export async function createTable() {
  console.log('create table');
  await client.connect();

  try {
    await client.queryObject`
      -- ---
      -- Sessions Table
      -- ---
      CREATE TABLE poems (
        "id" TEXT,
        "author" TEXT,
        "title" TEXT,
        "text" TEXT,
        PRIMARY KEY ("id")
      );
    `;
  } finally {
    // end the client back into the pool
    await client.end();
  }
}

export async function getPoem(id) {
  await client.connect();
  try {
    const query = "SELECT * FROM poems WHERE id = $ID;";
    const result = await client.queryObject<DbResponse>(query, { id });
    await client.end();
    return result.rows[0];
  } catch {}
}

export async function getPoems() {
  await client.connect();
  try {
    const query = "SELECT * FROM poems;";
    const result = await client.queryObject<DbResponse>(query, { id });
    await client.end();
    return result.rows;
  } catch {}
}

export async function postPoem(poem: Poem) {
  await client.connect();
  try {
    const query =
      "INSERT into poems (id, author, title, text) " +
      "VALUES ($ID, $AUTHOR, $TITLE, $TEXT) RETURNING *;";
    const result = await client.queryObject<DbResponse>(query, poem);
    await client.end();
    return result.rows;
  } catch {}
}
