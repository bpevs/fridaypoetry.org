import { Nav, NavItem, NavLogo } from "@zuck/core";
import { Component, h } from "preact";
import { Link } from "preact-router/match";
require("./NavBar");


interface Props {
  path?: string;
}


export function NavBar(props: Props) {
  const others = [
    <Link activeClassName="active" class="minor-nav-item" href="/settings">settings</Link>,
    <Link activeClassName="active" class="minor-nav-item" href="/about">about</Link>
  ];

  const isInfoPage =
    props.path === "/settings" ||
    props.path === "/about";

  return (
    <Nav>
      <NavItem>
        <Link
          activeClassName="active"
          class="main-nav-item"
          href={ isInfoPage ? "/" : "/settings" }>
          { isInfoPage ? "back" : "FridayPoetry.org" }
        </Link>
        { isInfoPage ? others : "" }
      </NavItem>
    </Nav>
  );
}
