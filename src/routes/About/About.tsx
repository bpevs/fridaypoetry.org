import { Component, h } from "preact";
import { Link } from "preact-router";
import { Col, Row } from "@zuck/core";
require("./About");


interface Props {
  path?: string;
}


export default function About(props: Props) {
  return (
    <main class="info-page">
      <div class="origin-story">
        <h1 class="title">Friday Poetry</h1>
        <p>
          Friday poetry was started by Dan in the MakerSquare alumni Slack Channel
          (MakerSquare was a immersive programming course that no longer exists). Every week,
          people were encouraged to extend their creative power, and write some poetry! I
          enjoyed doing this because it stretched parts of my brain that I don't use on a
          regular basis. In fact, I enjoyed doing this so much, I decided to make it into a website.
        </p>
      </div>
      <Row>
        <Col>
          <img
            class="origin-image"
            alt="wordsmith"
            src="/assets/images/wordsmith.jpg" />
        </Col>
        <Col>
          <img
            class="origin-image"
            alt="the first professional poem"
            src="/assets/images/poem.jpg" />
        </Col>
      </Row>
      <div className="github-link">
        This website is
        {" "}
        <a href="https://github.com/ivebencrazy/fridaypoetry.org">open-source</a>
      </div>
    </main>
  );
}
