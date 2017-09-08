import { h, Component } from "preact";
import { Router } from "preact-router";
import { bindAll } from "lodash";
import { createStore } from "./store/store";

import NavBar from "./components/NavBar/NavBar";
import Home from "./routes/home";
import Profile from "./routes/profile";
// import Home from "async!./home";
// import Profile from "async!./profile";
import Page from "./components/Page/Page";

declare var module: any;
declare var require: any;
declare global {
    interface Window {
        __FRIDAY_POETRY__: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

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
      <div id="app">
        <NavBar />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user" />
        </Router>
      </div>
    );
  }

  private handleRoute({ url }) {
    this.currentUrl = url;
  };
}
