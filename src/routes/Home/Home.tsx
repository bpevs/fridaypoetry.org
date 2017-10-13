import { find, toString } from "lodash";
import { Component, h } from "preact";
import { route } from "preact-router";
import { PageTurn, Poem } from "../../components";
import * as actionCreators from "../../store/actions/actionCreators";
const { connect } = require("preact-redux");


interface Props {
  value?: string;
  path?: string;
  dispatch: (...args: any[]) => any;
  state: any;
  poemId: string;
}


export class RawHome extends Component<Props, any> {
  constructor(props: Props, state: any) {
    super(props, state);
    props.dispatch(actionCreators.fetchPoemIds())
      .then(() => {
        const poemId = this.props.poemId;
        if (poemId && poemId.length) {
          return this.props.dispatch(actionCreators.fetchPoem(poemId));
        }

        const firstPoemId = this.props.state.poems.allIds[0];
        this.props.dispatch(actionCreators.fetchPoem(firstPoemId))
          .then(() => route(`/poem/${firstPoemId}`));
      });
  }


  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.poemId === this.props.poemId) { return; }

    const poemId = nextProps.poemId;
    if (poemId && poemId.length) {
      if (!nextProps.state.poems.byId[poemId]) {
        this.props.dispatch(actionCreators.fetchPoem(poemId));
      }
    }
  }

  public render(props: Props, state: any) {
    const poemIds = props.state.poems.allIds;

    const currIndex = poemIds.indexOf(props.poemId);
    const prevIndex = Math.max(currIndex - 1, 0);
    const nextIndex = Math.min(currIndex + 1, poemIds.length - 1);

    const poem = props.state.poems.byId[props.poemId];

    return (
      <div class="home">
        <PageTurn class="left" direction="left" onClick={this.turn.bind(this, prevIndex)} />
        <PageTurn class="right" direction="right" onClick={this.turn.bind(this, nextIndex)} />
        <Poem poem={poem} />
      </div>
    );
  }


  // PRIVATE
  private turn(index: number) {
    const id = this.props.state.poems.allIds[index];
    route(`/poem/${id}`);
  }
}


function mapStateToProps(state: any) {
  return { state };
}

export default connect(
  mapStateToProps
)(RawHome);
