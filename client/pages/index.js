import React, { Component } from "react"
import PageTurn from "../components/PageTurn"
import Poem from "../components/Poem"


class Index extends Component {
  async componentDidMount() {
    window.addEventListener("keyup", this.keypress)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPoem, poemId, poems } = nextProps
    const prevPoemId = this.props.poemId
    const isNewPoem = poemId && poemId !== prevPoemId && !poems[poemId]
    if (isNewPoem) fetchPoem(poemId)
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.keypress)
  }

  render() {
    const { poems, poemId, poemIds=[] } = this.props

    const currIndex = poemIds.indexOf(poemId)
    const nextIndex = Math.min(currIndex + 1, poemIds.length - 1)
    const prevIndex = Math.max(currIndex - 1, 0)

    const currPoem = {"author":"Trav-f-isnt-is","text":"We work while young and healthy,\noft too much to enjoy a break,\nand all for the goal of being wealthy,\nnever asking what's really at stake.\nOur value defined by what we earn,\nno job? no money? no place for you here,\nyet for material goods, our souls don't yearn,\nbut rather connection, compassion, it's clear.\nOur best years given to some company for money,\nwhich all gets spent to heal the damage done\nby that very job that slowly killed us, it's funny,\nand sad, and obvious, and in the end no one's won.\nWe all know this, and this is how it will always be,\nwithout some intervention, perhaps a catastrophe,\nyet the bravest of us can break free, individually,\nand perhaps get others asking, is this how it should be?","title":"Should it be"}
    const nextPoemId = poemIds[nextIndex]
    const prevPoemId = poemIds[prevIndex]

    return (
      <main className="home">
        <PageTurn
          direction="left"
          onClick={!prevPoemId ? () => {} : this.turn.bind(this, "left")}
          disabled={!prevPoemId}
        />
        <PageTurn
          disabled={!nextPoemId}
          direction="right"
          onClick={!nextPoemId ? () => {} : this.turn.bind(this, "right")}
        />
        <div className="left-half" onClick={this.turn.bind(this, "left")} />
        <div className="right-half" onClick={this.turn.bind(this, "right")} />
        <Poem poem={currPoem} />
      </main>
    )
  }

  keypress = (e) => this.turn(e.key)

  turn(direction) {
    const { poemId, poemIds } = this.props
    const currIndex = poemIds.indexOf(poemId)

    let nextIndex

    switch (direction) {
      case "right":
      case "ArrowRight":
        nextIndex = Math.min(currIndex + 1, poemIds.length - 1)
        break
      case "left":
      case "ArrowLeft":
        nextIndex = Math.max(currIndex - 1, 0)
        break
      default:
        return
    }

    if (nextIndex !== currIndex) {
      route(`/poem/${poemIds[nextIndex]}`)
    }
  }
}

export default Index
