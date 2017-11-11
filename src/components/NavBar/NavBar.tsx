import { Nav, NavItem, NavLogo } from "@zuck/core";
import { Component, h } from "preact";
import { Link } from "preact-router/match";
import { IS_FRIDAY } from "../../constants";
require("./NavBar");


interface Props {
  path?: string;
}


export default function NavBar(props: Props) {
  const settingsRoutes = [
    <Link activeClassName="active" href="/settings">settings</Link>,
    <Link activeClassName="active" href="/about">about</Link>
  ];

  const today = new Date();

  const isHome =
    props.path !== "/typewriter" &&
    props.path !== "/settings" &&
    props.path !== "/about";


  const homeHref = isHome ? "/about" : "/";

  const fridayMessage = (
    <Link
      activeClassName="active"
      class="friday-message"
      href="/typewriter">
      It's Friday! Write a poem!
    </Link>
  );

  return (
    <Nav>
      <NavItem>
        <Link
          activeClassName="active"
          href={ (isHome && IS_FRIDAY) ? "/typewriter" : homeHref }>
          { isHome ? "FridayPoetry.org" : "back" }
        </Link>
        { isHome && IS_FRIDAY ? fridayMessage : "" }
      </NavItem>
    </Nav>
  );
}
