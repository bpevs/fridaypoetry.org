import { h, Component } from "preact";
import { connect } from "preact-redux";
import { route } from "preact-router";
import { bindAll } from "lodash";
import { PageTurn, Poem } from "../../components";
import * as actions from "../../store/actions/actions";


interface Props {
  value?: string;
  path?: string;
  dispatch: Function;
  state: any;
  poemId: string;
}


export class RawHome extends Component<Props, any> {
  constructor(props, state) {
    super(props, state);
    props.dispatch(actions.fetchPoems());
    bindAll(this, [ "onLeft", "onRight" ]);
  }

  componentWillMount() {
    if (!this.props.poemId) {
      route("/poem/0");
    }
  }

  public render (props, state) {
    const poem = props.state.poems.byId[props.poemId];

    return (
      <div class="home">
        <PageTurn class="left" direction="left" onClick={this.onLeft} />
        <PageTurn class="right" direction="right" onClick={this.onRight} />
        <Poem poem={poem} />
      </div>
    );
  }

  protected onLeft() {
    const poemId = parseInt(this.props.poemId);
    const nextId = poemId ? poemId - 1 : 0;
    route(`/poem/${nextId}`);
  }
  protected onRight() {
    const nextPoemId = parseInt(this.props.poemId) + 1;
    const nextPoem = this.props.state.poems.byId[nextPoemId];
    const shouldGoNext = typeof nextPoemId == "number" && nextPoem != null;
    route(`/poem/${shouldGoNext ? nextPoemId : 0}`);
  }
}


function mapStateToProps(state) {
  return { state };
}

export default connect(
  mapStateToProps
)(RawHome);
