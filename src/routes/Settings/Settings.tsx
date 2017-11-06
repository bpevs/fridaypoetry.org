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
          <Row><Button outline>Remind me on Fridays</Button></Row>
          <Row><Button outline>Dark Mode</Button></Row>
        </form>
      </main>
    );
  }
}
