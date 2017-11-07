import { h } from "preact";
import { inHTMLData } from "xss-filters";


export default function Poem(props: any) {
  if (!props.poem) {
    return (
      <div class="no-content"></div>
    );
  }

  const { author, text } = props.poem;
  const authorComponent = (
    <p class="author">
      - {inHTMLData(author)}
    </p>
  );

  return (
    <div class="poem">
      <div class="content">
        <p class="text">{inHTMLData(text)}</p>
        {author != null ? authorComponent : "" }
      </div>
    </div>
   );
}
