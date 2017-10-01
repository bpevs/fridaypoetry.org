declare global {
  interface Window {
    __FRIDAY_POETRY__: any;
  }
}


import { bindAll, identity } from "lodash";
import { Component, h } from "preact";
import { Router } from "preact-router";

import { NavBar } from "./components";
import { About, Home, Settings } from "./routes";
import { createStore } from "./store/store";
const { Provider } = require("preact-redux");


const store = createStore();

export default class App extends Component<{}, {}> {
  public state: any;

  constructor() {
    super();
    bindAll(this, "handleRoute");
  }

  public render(props: any) {
    return (
      <Provider store={store}>
        <div class="container" >
          <NavBar path={this.state.currentUrl} />
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Home path="/poem/:poemId" />
            <Settings path="/settings" />
            <About path="/about" />
          </Router>
        </div>
      </Provider>
    );
  }

  private handleRoute(args: { url: string }) {
    this.setState({ currentUrl: args.url });
  }
}
