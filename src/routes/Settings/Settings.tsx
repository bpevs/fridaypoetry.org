import { Button } from "@zuck/core";
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
          <Button outline>Remind me on Fridays</Button>
        </form>
      </div>
    );
  }
}
