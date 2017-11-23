import { route } from "@zuck/core";
import { bindAll } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { PageTurn, Poem } from "../../components";
import * as actionCreators from "../../store/actions/actionCreators";


export class RawHome extends Component {
  componentWillMount() {
    const { fetchPoem, fetchPoemIds, poemId } = this.props;

    fetchPoemIds().then(() => {
      if (!poemId || !poemId.length) {
        route(`/poem/${this.props.poemIds[0]}`);
      } else {
        fetchPoem(poemId);
      }
    });

    bindAll(this, [ "keypress" ]);
  }

  componentDidMount() {
    window.addEventListener("keyup", this.keypress);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPoem, poemId, poems } = nextProps;
    const hasPoemId = poemId && poemId.length;
    const isPrevPoem = poemId === this.props.poemId;
    if (hasPoemId && !isPrevPoem && !poems[poemId]) {
      fetchPoem(poemId);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.keypress);
  }

  render() {
    const { poems, poemId } = this.props;

    return (
      <main className="home">
        <PageTurn direction="left" onClick={this.turn.bind(this, "left")} />
        <PageTurn direction="right" onClick={this.turn.bind(this, "right")} />
        <div className="left-half" onClick={this.turn.bind(this, "left")} />
        <div className="right-half" onClick={this.turn.bind(this, "right")} />
        <Poem poem={poems[poemId]} />
      </main>
    );
  }


  // PRIVATE
  keypress(e) {
    this.turn(e.key);
  }

  turn(direction) {
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
  (state) => ({
    poemIds: state.poems.allIds,
    poems: state.poems.byId
  }),
  {
    fetchPoem: actionCreators.fetchPoem,
    fetchPoemIds: actionCreators.fetchPoemIds
  }
)(RawHome);
