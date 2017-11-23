import { Button, Col, route, Row } from "@zuck/core";
import { assign, bindAll, clone } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import Poem from "../../components/Poem/Poem";
import TextArea from "../../components/TextArea/TextArea";
import * as actionCreators from "../../store/actions/actionCreators";


const defaultContent = {
  author: null,
  text: "",
  title: null
};


export class RawTypewriter extends Component {
  constructor(props) {
    super(props);
    this.state = { content: clone(defaultContent) };
    bindAll(this, [ "submit", "edit" ]);
  }

  render(props, state) {
    const { author, text, title } = state.content;

    return (
      <main className="typewriter typewriter__wrapper">
        <form onSubmit={this.submit}>
          <Row>
            <Col>
              <label>Title</label>
              <input name="title" value={title} onInput={this.edit} type="text" />
            </Col>
            <Col>
              <label>Author</label>
              <input name="author" value={author} onInput={this.edit} type="text" />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Poem</label>
              <TextArea name="text" value={text} onInput={this.edit} type="text" />
            </Col>
            <Col>
              <label>Preview</label>
              <Poem poem={{ author, text }} />
            </Col>
          </Row>
          <Button className="typewriter__submit">Submit</Button>
        </form>
      </main>
    );
  }


  // PRIVATE
  submit(event) {
    event.preventDefault();
    const shouldSubmit = true;
    // const shouldSubmit = confirm(`
    //   Ready to submit your poem?\n
    //   This is your last chance make edits.
    // `);

    if (!shouldSubmit) { return; }

    this.props.createPoem(this.state.content)
      .then(({ payload, type }) => {
          if (type === "CREATE_POEM_SUCCESS") {
            route(`/poem/${payload.poemId}`);
          }
      });
  }

  edit(event) {
    const nextContent = assign({}, this.state.content, {
      [event.target.name]: event.target.value
    });

    this.setState({ content: nextContent });
  }
}


export default connect(
  null,
  { createPoem: actionCreators.createPoem }
)(RawTypewriter);
