import { h } from "preact";


export function Poem(props: any) {
  if (!props.poem) {
    return (
      <div class="poem">
        <div class="content">
          <p class="author">
            No More Poems.  What a sad day!
          </p>
        </div>
      </div>
    );
   }

  return (
    <div class="poem">
      <div class="content">
        <p class="text">{props.poem.text}</p>
        <p class="author">- {props.poem.author}</p>
      </div>
    </div>
   );
}
