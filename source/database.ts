import "dotenv";
import { Client } from "postgres";
import { DbResponse, Poem } from "./types.ts";

const client = new Client({
  database: Deno.env.get("DB_DATABASE"),
  hostname: Deno.env.get("DB_HOSTNAME"),
  password: Deno.env.get("DB_PASSWORD"),
  port: Deno.env.get("DB_PORT"),
  user: Deno.env.get("DB_USER"),
});

export async function createTable() {
  console.log("create table");
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

export async function getPoem(id?: string) {
  await client.connect();
  try {
    let result;
    if (id) {
      const query = "SELECT * FROM poems WHERE id = $ID;";
      result = await client.queryObject<DbResponse>(query, { id });
    } else {
      const query = "SELECT * FROM poems;";
      result = (await client.queryObject<DbResponse>(query)).rows[0];
    }
    await client.end();
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getPoems() {
  await client.connect();
  try {
    const query = "SELECT * FROM poems;";
    const result = await client.queryObject<DbResponse>(query);
    await client.end();
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

export async function postPoem(poem: Poem) {
  await client.connect();
  try {
    const query =
      "INSERT into poems (id, author, title, text) VALUES ($ID, $AUTHOR, $TITLE, $TEXT) RETURNING *;";
    const result = await client.queryObject<DbResponse>(query, {
      id: poem.id || "",
      author: poem.author || "",
      title: poem.title || "",
      text: poem.text || "",
    });
    await client.end();
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}
