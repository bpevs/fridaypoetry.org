/// <reference lib="deno.unstable" />

import USID from "usid";
import { Poem } from "./types.ts";

const usid = new USID();
const kv = await Deno.openKv();

export async function getPoem(id?: string): Promise<Poem | undefined> {
  try {
    if (id && !(await kv.get(["poems", id])).value) return;
  } catch {
    return;
  }

  let prev: Poem | undefined;
  let curr: Poem | undefined;

  for await (
    const entry of kv.list<Poem>({ prefix: ["poems"] }, { reverse: true })
  ) {
    // No ID -> Get first poem
    if (!id) {
      if (!curr) curr = entry.value;
      else return { ...curr, next: entry.value.id || undefined };
    }

    // Poem has been found ->lready found. Return result
    if (curr && curr?.id === id) {
      if (prev?.id) curr.prev = prev.id;
      if (entry?.value?.id) curr.next = entry.value.id;
      return curr;
    }

    prev = curr;
    curr = entry.value;
  }
  // Last poem
  if (!curr) return;
  if (prev?.id) curr.prev = prev.id;
  return curr;
}

export function getAllPoems(): Deno.KvListIterator<Poem> {
  return kv.list({ prefix: ["poems"] });
}

export function createPoem(poem: Poem): Promise<Deno.KvCommitResult> {
  const id = usid.uuid(10);
  const data = {
    id,
    author: poem.author || "",
    title: poem.title || "",
    content: poem.content || "",
    published: Date.now(),
  };

  return kv.set(["poems", id], data);
}
