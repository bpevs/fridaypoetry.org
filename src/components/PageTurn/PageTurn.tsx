import { h } from "preact";
import { classNames } from "@zuck/ui";


interface PageTurnProps {
  class?: string;
  direction?: string;
  onClick?: Function
}


export default function PageTurn(props: PageTurnProps) {
  return <img
    class={classNames("page-turn", props.direction)}
    src="/assets/arrow.svg" />;
}
