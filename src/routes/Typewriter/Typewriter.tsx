import { Button, Col, Row } from "@zuck/core";
import { assign, bindAll, clone, identity } from "lodash";
import { Component, h } from "preact";
import { connect } from "preact-redux";
import { route } from "preact-router";
import { TextArea } from "../../components/TextArea/TextArea";
import * as actionCreators from "../../store/actions/actionCreators";


interface Props {
  createPoem: (...args: any[]) => any;
  onSubmit: () => void;
  path?: string;
}

const defaultContent = {
  author: null,
  text: "",
  title: null
};


export class RawTypewriter extends Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = { content: clone(defaultContent) };
    bindAll(this, [ "submit", "edit" ]);
  }

  public render(props: any, state: any) {
    const { author, text, title } = state.content;

    return (
      <main className="typewriter__wrapper">
        <form onSubmit={this.submit}>
          <Row>
            <Col>
              <label>Title</label>
              <input name="title" value={title} onChange={this.edit} type="text" />
            </Col>
            <Col>
              <label>Author</label>
              <input name="author" value={author} onChange={this.edit} type="text" />
            </Col>
          </Row>
          <div>
            <label>Poem</label>
            <TextArea name="text" value={text} onChange={this.edit} type="text" />
          </div>
          <Button className="typewriter__submit">Submit</Button>
        </form>
      </main>
    );
  }


  // PRIVATE
  private submit(event: Event) {
    event.preventDefault();
    this.props.createPoem(this.state.content)
      .then(({ payload, type }: any) => {
          if (type === "CREATE_POEM_SUCCESS") {
            route(`/poem/${payload.poemId}`);
          }
      });
  }

  private edit(event: any) {
    const nextContent = assign({}, this.state.content, {
      [event.target.name]: event.target.value
    });

    this.setState({ content: nextContent });
  }
}


export default connect(
  null,
  { createPoem: actionCreators.createPoem }
)(RawTypewriter as any);
