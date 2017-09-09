declare global {
  interface Window {
    __FRIDAY_POETRY__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}


import { h, Component } from "preact";
import { Router } from "preact-router";
import { bindAll } from "lodash";

import { createStore } from "./store/store";
import { NavBar } from "./components";
import { About, Home } from "./routes";


const store = createStore();


interface Props {}
interface State {}

export default class App extends Component<Props, State> {
  currentUrl: string;

  constructor() {
    super();
    bindAll(this, "handleRoute");
  }

  public render() {
    return (
      <div class="container">
        <NavBar />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Home path="/poem/:poemId" />
          <About path="/about/" />
        </Router>
      </div>
    );
  }

  private handleRoute({ url }) {
    this.currentUrl = url;
  };
}
