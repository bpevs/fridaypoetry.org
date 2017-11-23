import { Router } from "@zuck/core";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { NavBar } from "./components";
import { About, Home, Typewriter } from "./routes";
import { createStore } from "./store/store";

const store = createStore();


export class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container" >
          <NavBar path={this.currentUrl} />
          <Router onChange={({ url }) => this.currentUrl = url}>
            <About path="/about" />
            <Home path="/" />
            <Home path="/poem/:poemId" />
            <Typewriter path="/typewriter" />
          </Router>
        </div>
      </Provider>
    );
  }
}
