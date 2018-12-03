import { Col, Row } from "@civility/react"
import * as React from "react"


export default () => <main className="about-page">
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
  <Row className="center">
    <Col colSize={[ 12, 6, 6 ]}>
      <img
        className="origin-image"
        alt="wordsmith"
        src="/public/images/wordsmith.jpg" />
    </Col>
    <Col colSize={[ 12, 6, 6 ]}>
      <img
        className="origin-image"
        alt="the first professional poem"
        src="/public/images/poem.jpg" />
    </Col>
  </Row>
  <div className="github-link">
    This website is
    {" "}
    <a href="https://github.com/ivebencrazy/fridaypoetry.org">open-source</a>
  </div>
</main>
