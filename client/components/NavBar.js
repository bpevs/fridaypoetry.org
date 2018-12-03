import { Nav, Only } from "@civility/react"
import * as React from "react"

const routes = new Set([ "/typewriter", "/settings", "/about" ])

export default props => {
  const isFriday = new Date().getDay() === 5
  const isHome = !routes.has(props.path)
  const homeHref = isHome ? "/about" : "/"

  return (
    <Nav>
      <Nav.Item
        href={ (isHome && isFriday) ? "/typewriter" : homeHref }
        title={ isHome ? "FridayPoetry.org" : "back" }
      />
      <Only if={isHome && isFriday}>
        <Nav.Item
          activeClassName="active"
          className="friday-message"
          href="/typewriter"
          title="It's Friday! Write a poem!"
        />
      </Only>
    </Nav>
  )
}
