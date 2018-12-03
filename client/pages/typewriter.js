import { Button, Col, Input, Row } from "@civility/react"
import { bindAll } from "@civility/utilities"
import React, { Component } from "react"
import Poem from "../components/Poem"
import TextArea from "../components/TextArea"


const defaultContent = {
  author: "",
  text: "",
  title: ""
}


export class Typewriter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: Object.assign({}, defaultContent)
    }

    bindAll(this, [ "submit", "edit" ])
  }

  render() {
    const { author, text, title } = this.state.content

    return (
      <main className="typewriter typewriter__wrapper m2">
        <form onSubmit={this.submit}>
          <Row className="input-row">
            <Col className="input-col" colSize={[ 12, 6, 6 ]}>
              <Input label="Title" name="title" value={title} onInput={this.edit} type="text" />
            </Col>
            <Col className="input-col" colSize={[ 12, 6, 6 ]}>
              <Input label="Author" name="author" value={author} onInput={this.edit} type="text" />
            </Col>
          </Row>
          <Row>
            <Col colSize={[ 12, 6, 6 ]}>
              <label className="bold">Poem</label>
              <TextArea name="text" value={text} onInput={this.edit} type="text" />
            </Col>
            <Col colSize={[ 12, 6, 6 ]}>
              <label className="bold">Preview</label>
              <Poem poem={{ author: author || "Anonymous", text: text || "Poems\nSometimes\nStart\nWith\nWords" }} />
            </Col>
          </Row>
          <Button className="primary submit-button">Submit</Button>
        </form>
      </main>
    )
  }

  async submit(event) {
    event.preventDefault()
    const shouldSubmit = true

    if (!shouldSubmit) { return }
    const { payload, type } = await this.props.createPoem(this.state.content)
    if (type === "CREATE_POEM_SUCCESS") route(`/poem/${payload.poemId}`)
  }

  edit(event) {
    const { name, value } = event.target;

    this.setState({
      content: Object.assign({}, this.state.content, { [name]: value })
    })
  }
}


export default Typewriter
