import { Component, h } from "preact";
require("./About");


interface Props {
  path?: string;
}


export default function About(props: Props) {
  return (
    <div class="info-page">
      <h1 class="title">About</h1>
      <div class="origin-story">
        <p>
          Friday poetry got its start by Dan in the MakerSquare alumni Slack Channel
          (MakerSquare was a coding immersive course that no longer exists). Every week,
          people were encouraged to extend their creative power, and write some poetry! I
          enjoyed doing this because it stretched parts of my brain that I don't use on a
          regular basis. In fact, I enjoyed doing this so much, I decided to make it into a website.
        </p>
        <p>This is that website.</p>
      </div>
    </div>
  );
}
