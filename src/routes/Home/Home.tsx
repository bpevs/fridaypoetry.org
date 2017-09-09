import { h, Component } from "preact";
import { PageTurn, Poem } from "../../components";


interface Props {
  value?: string;
  path?: string;
}

interface State {
}


export class Home extends Component<Props, State> {
  public render(props: Props, state: State) {
    return (
      <div class="home">
        <PageTurn class="left" direction="left" />
        <PageTurn class="right" direction="right" />
        <Poem author="Shel Silverstein" />
      </div>
    );
  }
}
