import { Nav, NavItem, NavLogo } from "@zuck/core";
import { Component, h } from "preact";
import { Link } from "preact-router/match";


export function NavBar() {
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
