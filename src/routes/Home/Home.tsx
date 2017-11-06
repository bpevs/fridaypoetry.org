import { find, toString } from "lodash";
import { Component, h } from "preact";
import { connect } from "preact-redux";
import { route } from "preact-router";
import { PageTurn, Poem } from "../../components";
import * as actionCreators from "../../store/actions/actionCreators";


interface Props {
  fetchPoem: (...args: any[]) => any;
  fetchPoemIds: (...args: any[]) => any;
  path?: string;
  poemId: string;
  poems: any;
  poemIds: string[];
  value?: string;
}


export class RawHome extends Component<Props, any> {
  public componentWillMount() {
    const { fetchPoem, fetchPoemIds, poemId, poemIds } = this.props;

    fetchPoemIds().then(() => {
      if (!poemId || !poemId.length) {
        route(`/poem/${this.props.poemIds[0]}`);
      } else {
        fetchPoem(poemId);
      }
    });
  }

  public componentDidMount() {
    window.addEventListener("keyup", this.keypress.bind(this));
  }

  public componentWillReceiveProps(nextProps: any) {
    const { fetchPoem, poemId, poems } = nextProps;
    const hasPoemId = poemId && poemId.length;
    const isPrevPoem = poemId === this.props.poemId;
    if (hasPoemId && !isPrevPoem && !poems[poemId]) {
      fetchPoem(poemId);
    }
  }

  public componentWillUnmount() {
    window.removeEventListener("keyup", this.keypress.bind(this));
  }

  public render(props: Props) {
    const { poems, poemId, poemIds } = props;

    return (
      <main class="home">
        <PageTurn direction="left" onClick={this.turn.bind(this, "left")} />
        <PageTurn direction="right" onClick={this.turn.bind(this, "right")} />
        <Poem poem={poems[poemId]} />
      </main>
    );
  }


  // PRIVATE
  private keypress(e: KeyboardEvent) {
    this.turn(e.key);
  }

  private turn(direction: string) {
    const { poemId, poemIds } = this.props;
    const currIndex = poemIds.indexOf(poemId);

    let nextIndex;

    switch (direction) {
      case "right":
      case "ArrowRight":
        nextIndex = Math.min(currIndex + 1, poemIds.length - 1);
        break;
      case "left":
      case "ArrowLeft":
        nextIndex = Math.max(currIndex - 1, 0);
        break;
      default:
        return;
    }

    if (nextIndex !== currIndex) {
      route(`/poem/${poemIds[nextIndex]}`);
    }
  }
}

export default connect(
  (state: any) => ({
    poemIds: state.poems.allIds,
    poems: state.poems.byId
  }),
  {
    fetchPoem: actionCreators.fetchPoem,
    fetchPoemIds: actionCreators.fetchPoemIds
  }
)(RawHome);
