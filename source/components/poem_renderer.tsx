import * as React from "react";
import { inHTMLData } from "xss-filters";

export default function PoemTextArea(props) {
  if (!props.poem) {
    return <div className="no-content"></div>;
  }

  const { author, text } = props.poem;
  const authorComponent = (
    <p className="author">
      - {inHTMLData(author)}
    </p>
  );

  return (
    <div className="poem">
      <div className="content">
        <p className="text">{inHTMLData(text)}</p>
        {author != null ? authorComponent : ""}
      </div>
    </div>
  );
}
