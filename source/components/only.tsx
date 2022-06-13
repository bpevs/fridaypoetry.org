/* @jsx h */
import { h, VNode } from "preact";

// deno-lint-ignore no-explicit-any
export interface OnlyProps {
  if: boolean;
  children: VNode<any>;
};

export default function Only({ if: predicate, children }: OnlyProps) {
  return predicate ? children : null;
}
