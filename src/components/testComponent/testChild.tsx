import { JSX, createEffect } from "solid-js";

interface childProps {
  hovered?: "one" | "two" | "three";
}

export default function TestChild(props: childProps) {
  createEffect(() => {
    console.log(props.hovered);
  });
  return <div class="testChild"></div>;
}
