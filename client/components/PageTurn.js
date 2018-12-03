import { classNames as cx } from "@civility/utilities"
import * as React from "react"


export default props => <span
  className={cx("page-turn", props.className, props.direction, props.disabled && "disabled")}
  children={props.direction  === "left" ? "⟪" : "⟫"}
  onClick={props.onClick}
/>
