import { h } from "preact";


export function Poem(props: any) {
  return (
    <div class="poem">
      <div class="content">
        <p class="text">
          There is a place where the sidewalk ends<br />
          And before the street begins,<br />
          And there the grass grows soft and white,<br />
          And there the sun burns crimson bright,<br />
          And there the moon-bird rests from his flight<br />
          To cool in the peppermint wind.<br />
          <br />
          Let us leave this place where the smoke blows black<br />
          And the dark street winds and bends.<br />
          Past the pits where the asphalt flowers grow<br />
          We shall walk with a walk that is measured and slow,<br />
          And watch where the chalk-white arrows go<br />
          To the place where the sidewalk ends.<br />
          <br />
          Yes we'll walk with a walk that is measured and slow,<br />
          And we'll go where the chalk-white arrows go,<br />
          For the children, they mark, and the children, they know<br />
          The place where the sidewalk ends.<br />
        </p>
        <p class="author">- {props.author}</p>
      </div>
    </div>
   );
}
