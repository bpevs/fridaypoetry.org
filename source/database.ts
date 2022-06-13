import "dotenv";
import { Client } from "postgres";
import { v4 } from "std/uuid";
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
      DROP TABLE IF EXISTS "poems";
      -- ---
      -- Sessions Table
      -- ---
      CREATE TABLE poems (
        "id" TEXT,
        "author" TEXT,
        "title" TEXT,
        "content" TEXT,
        "published" TIMESTAMP,
        PRIMARY KEY ("id")
      );
    `;
  } finally {
    // end the client back into the pool
    await client.end();
  }
}

const getPoemQuery = `
SELECT *
FROM (
  SELECT id, author, title, content, published,
    lag(id) OVER (ORDER BY published DESC) AS prev,
    lead(id) OVER (ORDER BY published DESC) AS next
  FROM poems
) x
WHERE id = $ID
`;

export async function getPoem(id?: string) {
  await client.connect();
  try {
    let result;
    if (id) {
      result = await client.queryObject<DbResponse>(getPoemQuery, { id });
      console.log(result);
    }
    await client.end();
    return result?.rows?.[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getRecentPoems() {
  await client.connect();
  try {
    const query = "SELECT * FROM poems ORDER BY published DESC;";
    const result = await client.queryObject<DbResponse>(query);
    await client.end();
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

export async function postPoem(poem: Poem) {
  const id = v4.generate();
  await client.connect();
  try {
    const query =
      "INSERT into poems (id, author, title, content, published) " +
      "VALUES ($ID, $AUTHOR, $TITLE, $CONTENT, to_timestamp($PUBLISHED / 1000.0)) " +
      "RETURNING *;";
    const params = {
      id,
      author: poem.author || "",
      title: poem.title || "",
      content: poem.content || "",
      published: Date.now(),
    };

    const result = await client.queryObject<DbResponse>(query, params);
    await client.end();
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}
