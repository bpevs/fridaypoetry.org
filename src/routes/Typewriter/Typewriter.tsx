import { Button } from "@zuck/core";
import { assign, bindAll, clone } from "lodash";
import { Component, h } from "preact";
import { connect } from "preact-redux";
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
      <div className="typewriter__wrapper">
        <input    name="author" value={author} onChange={this.edit} />
        <input    name="title"  value={title}  onChange={this.edit} />
        <TextArea name="text"   value={text}   onChange={this.edit} />
        <Button className="typewriter__submit" onClick={this.submit}>Submit</Button>
      </div>
    );
  }


  // PRIVATE
  private submit() {
    this.props.createPoem(this.state.content)
      .then(() => this.setState({ content: clone(defaultContent) }))
      .then(this.props.onSubmit);
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
