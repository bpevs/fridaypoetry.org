import "./index.styl";

import { h, Component } from "preact";
import { Router } from "preact-router";
import { bindAll } from "lodash";

import Header from "./components/header";
import Home from "./routes/home";
import Profile from "./routes/profile";
// import Home from "async!./home";
// import Profile from "async!./profile";

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
        <Header />
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
