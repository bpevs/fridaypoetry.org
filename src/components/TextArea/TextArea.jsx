import { bindAll } from "lodash";
import React, { Component } from "react";


export default class TextArea extends Component {
  state;

  constructor(props) {
    super(props);
    this.state = { element: null, editor: null };
    bindAll(this, [ "saveRef" ]);
  }


  render() {
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
  saveRef(element) {
    this.setState({ element });
  }
}
