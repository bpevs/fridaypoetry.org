import { classNames } from "@zuck/core";
import { h } from "preact";


interface Props {
  class?: string;
  direction?: string;
  onClick?: any;
}


export default function PageTurn(props: Props) {
  return <img
    alt={props.direction}
    onClick={props.onClick}
    class={classNames("page-turn", props.class, props.direction)}
    src="/assets/images/arrow.svg" />;
}
