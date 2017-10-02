import { Button, Row } from "@zuck/core";
import { Component, h } from "preact";
require("./Settings");

interface Props {
  path?: string;
}

interface State {
  timer?: any;
}

export default class Settings extends Component<Props, State> {
  public render(props: Props, state: State) {
    return (
      <div class="info-page">
        <h1>Settings</h1>
        <form class="settings">
          <Row><Button outline>Remind me on Fridays</Button></Row>
          <Row><Button outline>Dark Mode</Button></Row>
        </form>
      </div>
    );
  }
}
