import { classNames } from "@zuck/core";
import { h } from "preact";


interface Props {
  class?: string;
  direction?: string;
  onClick?: any;
}


export function PageTurn(props: Props) {
  return <img
    onClick={props.onClick}
    class={classNames("page-turn", props.direction)}
    src="/assets/arrow.svg" />;
}
