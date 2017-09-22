import { Component, h } from "preact";
const style = require("./About");

interface Props {
  path?: string;
  user?: any;
}

interface State {
  timer?: any;
  time: number;
  count: number;
}

export default class About extends Component<Props, State> {
  public state: State = {
    count: 10,
    time: Date.now()
  };

  // gets called when this route is navigated to
  public componentDidMount() {
    // start a timer for the clock:
    this.state.timer = setInterval(this.updateTime, 1000);
  }

  // gets called just before navigating away from the route
  public componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  // Note: `user` comes from the URL, courtesy of our router
  public render(props: Props, state: State) {
    return (
      <div class={style.profile}>
        <h1>Profile: {props.user}</h1>
        <p>This is the user profile for a user named { props.user }.</p>

        <div>Current time: {new Date(state.time).toLocaleString()}</div>

        <p>
          <button onClick={this.increment}>Click Me</button>
          {" "}
          Clicked {state.count} times.
        </p>
      </div>
    );
  }

    // update the current time
    private updateTime = () => {
      this.setState({ time: Date.now() });
    }

    private increment = () => {
      this.setState({ count: this.state.count + 1 });
    }
}
