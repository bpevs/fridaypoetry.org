import { h } from "preact";
import render from "preact-to-json";
import About from "./About";


test("Should render", () => {
  expect(render(<About />)).toMatchSnapshot();
});
