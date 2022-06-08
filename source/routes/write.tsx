/* @jsx h */
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Poem } from "../types.ts";

function PoemPreview({ poem }: { poem: Poem }) {
  return null;
}

const defaultContent = Object.freeze({
  id: "0",
  text: "",
});

export default function Write() {
  const [state, setState] = useState<Poem>({ ...defaultContent });
  const { author, text, title } = state;

  return (
    <form>
      <label for="title">Title</label>
      <input name="title" value={title || ""} type="text" />

      <label for="author">Author</label>
      <input name="author" value={author || ""} type="text" />

      <fieldset>
        <legend>Poem</legend>
        <label for="content">Content</label>
        <textarea name="content" rows={5} cols={100} />
        <label for="preview">Preview</label>
        <PoemPreview poem={{ author, text, id: "0" }} />
      </fieldset>
      <button>Submit</button>
    </form>
  );
}
