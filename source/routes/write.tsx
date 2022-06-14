/* @jsx h */
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Poem } from "../types.ts";
import { isFridaySomewhere } from "../constants.ts";

const confirmMessage = `\
Submit your poem?\\n\
You cannot delete a poem once submitted.`;

export default function Write() {
  if (!isFridaySomewhere()) {
    return <p>Poem writing is only enabled on Fridays.</p>;
  }

  return (
    <form
      action="/api/poems"
      method="post"
      onSubmit={
        // onSubmit expects func, which isn't passed through render-to-string.
        // `string` IS passed through though, so let's bypass typecheck via any.
        // deno-lint-ignore no-explicit-any
        `return confirm('${confirmMessage}');` as any
      }
    >
      <label for="title">Title</label>
      <input name="title" type="text" />

      <label for="author">Author</label>
      <input name="author" type="text" />

      <fieldset>
        <legend>Poem</legend>
        <textarea required type="text" name="content" />
      </fieldset>

      <input className="submit" type="submit" value="Submit" />
    </form>
  );
}
