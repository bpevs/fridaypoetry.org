/** @jsx jsx **/
import { jsx } from "hono/middleware.ts";

export interface OnlyProps {
  if: boolean;
  // deno-lint-ignore no-explicit-any
  children: VNode<any>;
}

export default function Only({ if: predicate, children }: OnlyProps) {
  return predicate ? children : null;
}
