import { classNames } from "@zuck/core";
import * as React from "react";
import arrow from "../../assets/images/arrow.svg";


export default function PageTurn(props) {
  return <img
    alt={props.direction}
    onClick={props.onClick}
    className={classNames("page-turn", props.class, props.direction)}
    src={arrow} />;
}
