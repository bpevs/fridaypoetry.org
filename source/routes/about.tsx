/** @jsx jsx **/
import { jsx } from "hono/middleware.ts";

export default () => (
  <main class="about">
    <h1>Friday Poetry</h1>
    <p>Writing poetry. On Fridays. 📃✍️</p>

    <p class="about-text">
      The tradition of Friday Poetry was started by Dan in the MakerSquare
      alumni Slack Channel (MakerSquare was a immersive programming course that
      no longer exists). Every week, people were encouraged to extend their
      creative power, and write some poetry! I enjoyed doing this because it
      stretched parts of my brain that I don't use on a regular basis. In fact,
      I enjoyed doing this so much, I decided to make it into a website.
    </p>
    <p>
      <img
        class="about-image"
        alt="wordsmith"
        src="/assets/about-wordsmith.jpg"
      />
      <img
        class="about-image"
        alt="the first professional poem"
        src="/assets/about-poem.jpg"
      />
    </p>
    <p>
      fridaypoetry.org is{" "}
      <a href="https://github.com/ivebencrazy/fridaypoetry.org">open-source</a>
      {"  "}and made with ❤️ by <a href="https://bpev.me/apps">Ben Pevsner</a>
    </p>
    <p>
      <a
        href="/friday-poetry-reminder.ics"
        target="_BLANK"
        download="Friday Poetry Reminder Calendar"
      >
        Download the FridayPoetry Calendar Reminder
      </a>
    </p>
  </main>
);
