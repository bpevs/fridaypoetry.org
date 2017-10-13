import { Button } from "@zuck/core";
import { assign, bindAll, clone } from "lodash";
import { Component, h } from "preact";

import { TextArea } from "../TextArea/TextArea";


const content = {
  author: null,
  text: "",
  title: null
};


export class Typewriter extends Component<any, any> {
  public state: any;

  constructor(props: any) {
    super(props);
    this.state = { content: clone(content) };
    bindAll(this, [ "submit", "edit" ]);
  }


  public render() {
    const { author, text, title } = this.state.content;

    return (
      <div className="typewriter__wrapper">
        <input    name="author" value={author} onChange={this.edit} />
        <input    name="title"  value={title}  onChange={this.edit} />
        <TextArea name="text"   value={text}   onChange={this.edit} />
        <Button className="typewriter__submit">Submit</Button>
      </div>
    );
  }


  // PRIVATE
  private submit() {
    const { actions, onSubmit } = this.props;

    actions.createContent(this.state.content)
      .then(() => this.setState({ content: clone(content) }))
      .then(onSubmit);
  }

  private edit(event: any) {
    const nextContent = assign({}, this.state.content, {
      [event.target.name]: event.target.value
    });

    this.setState({ content: nextContent });
  }
}
