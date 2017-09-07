import { h, Component } from "preact";
import { Nav, NavItem, NavLogo } from "@zuck/ui";

import { Link } from "preact-router/match";

export default function NavBar () {
  return (
    <Nav>
      <NavItem>FridayPoetry.org</NavItem>
      <NavItem><Link activeClassName="active" href="/">Home</Link></NavItem>
      <NavItem><Link activeClassName="active" href="/profile">Me</Link></NavItem>
      <NavItem><Link activeClassName="active" href="/profile/john">John</Link></NavItem>
    </Nav>
  );
}
