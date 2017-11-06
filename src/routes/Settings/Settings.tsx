import { Button, Row } from "@zuck/core";
import { Component, h } from "preact";
require("./Settings");


interface Props {
  path?: string;
}


export default class Settings extends Component<Props, any> {
  public render(props: Props) {
    return (
      <main class="info-page">
        <h1>Settings</h1>
        <form class="settings">
          <Row>
            <Button
              outline
              onClick={this.remindMe}
              >Remind me on Fridays</Button>
          </Row>
          <Row>
            <Button
              outline
              onClick={this.darkMode}
              >Dark Mode" </Button>
          </Row>
        </form>
      </main>
    );
  }

  private remindMe(event: Event) {
    event.preventDefault();
  }
  private darkMode(event: Event) {
    event.preventDefault();
  }
}
