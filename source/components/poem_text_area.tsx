import React, { Component } from "react";

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = { element: null, editor: null };
  }

  setRef = (el) => this.setState({ element: el });

  render() {
    return (
      <div className="text-area__wrapper">
        <textarea
          {...this.props}
          className="text-area__content"
          ref={this.setRef}
        />
      </div>
    );
  }
}
