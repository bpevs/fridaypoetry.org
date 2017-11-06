declare global {
  interface Window {
    __FRIDAY_POETRY__: any;
  }
}


import { Component, h } from "preact";
import { Provider } from "preact-redux";
import { Router } from "preact-router";
import { NavBar } from "./components";
import { About, Home, Settings, Typewriter } from "./routes";
import { createStore } from "./store/store";


const store = createStore();

export default class App extends Component<any, any> {
  public render(props: any, state: any) {
    return (
      <Provider store={store}>
        <div class="container" >
          <NavBar path={state.currentUrl} />
          <Router onChange={this.handleRoute.bind(this)}>
            <Home path="/" />
            <Home path="/poem/:poemId" />
            <About path="/settings" />
            <About path="/about" />
            <Typewriter path="/typewriter" />
          </Router>
        </div>
      </Provider>
    );
  }

  private handleRoute({ url }: any) {
    this.setState({ currentUrl: url });
  }
}
