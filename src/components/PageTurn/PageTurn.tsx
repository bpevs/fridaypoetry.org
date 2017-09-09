import { h } from "preact";
import { classNames } from "@zuck/core";


interface Props {
  class?: string;
  direction?: string;
  onClick?: Function
}


export function PageTurn(props: Props) {
  return <img
    class={classNames("page-turn", props.direction)}
    src="/assets/arrow.svg" />;
}
