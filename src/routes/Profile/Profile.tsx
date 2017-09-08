import { h, Component } from "preact";
const style = require("./style");

interface Props {
  path?: string;
  user?: any;
}

interface State {
  timer?: any;
  time: number;
  count: number;
}

export class Profile extends Component<Props, State> {
  state: State = {
    time: Date.now(),
    count: 10
  };

  // gets called when this route is navigated to
  componentDidMount() {
    // start a timer for the clock:
    this.state.timer = setInterval(this.updateTime, 1000);
  }

  // gets called just before navigating away from the route
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  // update the current time
  updateTime = () => {
    this.setState({ time: Date.now() });
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // Note: `user` comes from the URL, courtesy of our router
  render({ user }, { time, count }) {
    return (
      <div class={style.profile}>
        <h1>Profile: {user}</h1>
        <p>This is the user profile for a user named { user }.</p>

        <div>Current time: {new Date(time).toLocaleString()}</div>

        <p>
          <button onClick={this.increment}>Click Me</button>
          {" "}
          Clicked {count} times.
        </p>
      </div>
    );
  }
}
