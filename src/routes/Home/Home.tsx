import { h, Component } from "preact";
import { connect } from "preact-redux";
import { bindAll } from "lodash";
import { PageTurn, Poem } from "../../components";
import * as actions from "../../store/actions/actions";


interface Props {
  value?: string;
  path?: string;
  dispatch: Function;
  state: any;
}

interface State {
}

export class RawHome extends Component<Props, State> {
  constructor(props, state) {
    super(props, state);
    props.dispatch(actions.fetchPoems());
    bindAll(this, [ "onLeft", "onRight" ]);
  }

  public render (props: Props, state: State) {
    const poem = props.state.poems.byId[props.state.page.current];

    return (
      <div class="home">
        <PageTurn class="left" direction="left" onClick={this.onLeft} />
        <PageTurn class="right" direction="right" onClick={this.onRight} />
        <Poem poem={poem} />
      </div>
    );
  }

  protected onLeft() {
    this.props.dispatch(actions.turnPage(-1));
  }
  protected onRight() {
    this.props.dispatch(actions.turnPage(1));
  }
}


function mapStateToProps(state) {
  return { state };
}

export default connect(
  mapStateToProps
)(RawHome);
