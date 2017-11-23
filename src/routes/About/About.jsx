import { Col, Row } from "@zuck/core";
import * as React from "react";


export default function About(props) {
  return (
    <main className="info-page">
      <div className="origin-story">
        <h1 className="title">Friday Poetry</h1>
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
            className="origin-image"
            alt="wordsmith"
            src="/assets/images/wordsmith.jpg" />
        </Col>
        <Col>
          <img
            className="origin-image"
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
