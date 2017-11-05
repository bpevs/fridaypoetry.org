import { Button } from "@zuck/core";
import { assign, bindAll, clone } from "lodash";
import { Component, h } from "preact";
import { connect, DispatchProp } from "preact-redux";

import { TextArea } from "../../components/TextArea/TextArea";
import * as actionCreators from "../../store/actions/actionCreators";


type Func = (...args: any[]) => any;
interface Props {
  path?: string;
  onSubmit: () => void;
  state: any;
}

interface Actions {
  actions: { [key: string]: Func };
}


const content = {
  author: null,
  text: "",
  title: null
};


export class RawTypewriter extends Component<Props & Actions, any> {
  public state: any;

  constructor(props: any) {
    super(props);
    this.state = { content: clone(content) };
    bindAll(this, [ "submit", "edit" ]);
  }


  public render(props: any) {
    const { author, text, title } = this.state.content;
    console.log(props.actions);
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


export default connect(
  (state: any) => ({ state }),
  { actions: actionCreators }
)(RawTypewriter as any);
