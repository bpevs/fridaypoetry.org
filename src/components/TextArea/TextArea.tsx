import { bindAll } from "lodash";
import { Component, h } from "preact";


export class TextArea extends Component<any, any> {
  public state: any;

  constructor(props: any) {
    super(props);
    this.state = { element: null, editor: null };
    bindAll(this, [ "saveRef" ]);
  }


  public render() {
    const textAreaProps = this.props;
    return (
      <div className="text-area__wrapper">
        <textarea
          {...textAreaProps}
          className="text-area__content"
          ref={this.saveRef} />
      </div>
    );
  }


  // PRIVATE
  private saveRef(element: any) {
    this.setState({ element });
  }
}
