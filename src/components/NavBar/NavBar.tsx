import { h, Component } from "preact";
import { Nav, NavItem, NavLogo } from "@zuck/core";
import { Link } from "preact-router/match";


export function NavBar () {
  return (
    <Nav>
      <NavItem>
        <Link activeClassName="active" href="/">
          FridayPoetry.org
        </Link>
      </NavItem>
    </Nav>
  );
}
