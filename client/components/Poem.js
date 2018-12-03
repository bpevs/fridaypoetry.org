import * as React from "react"
import { inHTMLData } from "xss-filters"
import { Only } from "@civility/react"


export default ({ poem }) => !poem
  ? <div className="no-content" />
  : <div className="poem">
      <div className="content">
        <p className="text">{inHTMLData(poem.text)}</p>
        <Only if={poem.author != null}>
          <p className="author">
            {"- " + inHTMLData(poem.author)}
          </p>
        </Only>
      </div>
    </div>
