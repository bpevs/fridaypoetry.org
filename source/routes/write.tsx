/* @jsx h */
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Poem } from "../types.ts";
import { isFridaySomewhere } from "../constants.ts";
import Only from "../components/only.tsx";
import { poems } from "../sample_poems.ts";

const confirmMessage = `\
Submit your poem?\\n\
You cannot delete a poem once submitted.`;

export default function Write() {
  const samplePoem = poems[Math.floor(Math.random() * poems.length)];

  return (
    <div>
      <Only if={!isFridaySomewhere()}>
        <h3 style={{ textAlign: "center" }}>Poem writing is only enabled on Fridays!</h3>
      </Only>
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
      <div class="input-group">
        <div class="input-item">
            <label for="title">Title</label>
            <input name="title" type="text" placeholder={samplePoem.title} disabled={!isFridaySomewhere()} />
          </div>
        <div class="input-item">
          <label for="author">Author</label>
          <input name="author" type="text" placeholder={samplePoem.author} disabled={!isFridaySomewhere()} />
        </div>
      </div>
        <fieldset>
          <legend>Poem</legend>
          <textarea
            required
            type="text"
            name="content"
            placeholder={samplePoem.content}
            disabled={!isFridaySomewhere()}
          />
        </fieldset>

        <input class="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
