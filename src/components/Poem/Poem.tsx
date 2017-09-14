import { h } from "preact";
import { inHTMLData } from "xss-filters";


export function Poem(props: any) {
  if (!props.poem) {
    return (
      <div class="no-content">
        No poem here!  What a sad day!
      </div>
    );
   }

  return (
    <div class="poem">
      <div class="content">
        <p class="text">{inHTMLData(props.poem.text)}</p>
        <p class="author">- {inHTMLData(props.poem.author)}</p>
      </div>
    </div>
   );
}
