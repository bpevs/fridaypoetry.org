import "dotenv";
import { Client } from "postgres";
import { v4 } from "std/uuid";
import { Poem } from "./types.ts";

const client = new Client({
  database: Deno.env.get("DB_DATABASE"),
  hostname: Deno.env.get("DB_HOSTNAME"),
  password: Deno.env.get("DB_PASSWORD"),
  port: Deno.env.get("DB_PORT"),
  user: Deno.env.get("DB_USER"),
});

const appendSurroundingIds = `
FROM (
  SELECT id, author, title, content, published,
    lag(id) OVER (ORDER BY published DESC) AS prev,
    lead(id) OVER (ORDER BY published DESC) AS next
  FROM poems
) x`;
const getAllPoemsQuery = "SELECT * FROM poems ORDER BY published DESC;";
const getPoemByIdQuery = `SELECT * ${appendSurroundingIds} WHERE id = $ID`;
const getFirstPoemQuery = `SELECT * ${appendSurroundingIds} LIMIT 1`;

if (Deno?.args?.includes("--reset-db")) {
  createTable();
}

export async function createTable() {
  console.log("creating table");
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

export async function getPoem(id?: string): Promise<Poem | undefined> {
  await client.connect();
  try {
    const results = id
      ? await client.queryObject<Poem>(getPoemByIdQuery, { id })
      : await client.queryObject<Poem>(getFirstPoemQuery);
    await client.end();

    return results.rows?.[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPoems(): Promise<Poem[]> {
  await client.connect();
  try {
    const result = await client.queryObject<Poem>(getAllPoemsQuery);
    await client.end();
    return result.rows || [];
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function createPoem(poem: Poem): Promise<Poem | undefined> {
  const id = v4.generate();
  await client.connect();
  try {
    const query = "INSERT into poems (id, author, title, content, published) " +
      "VALUES ($ID, $AUTHOR, $TITLE, $CONTENT, to_timestamp($PUBLISHED / 1000.0)) " +
      "RETURNING *;";
    const params = {
      id,
      author: poem.author || "",
      title: poem.title || "",
      content: poem.content || "",
      published: Date.now(),
    };

    const result = await client.queryObject<Poem>(query, params);
    await client.end();
    return result.rows?.[0];
  } catch (error) {
    console.error(error);
  }
}
