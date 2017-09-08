import { h, Component } from "preact";
import PageTurn from "../../components/PageTurn/PageTurn";
import style from "./style";

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <h1>Home</h1>
        <p>This is the Home component.</p>
        <PageTurn />
        <PageTurn direction="right" />
        <PageTurn direction="up" />
        <PageTurn direction="down" />
      </div>
    );
  }
}
