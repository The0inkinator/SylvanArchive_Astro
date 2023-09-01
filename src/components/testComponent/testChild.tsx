import { JSX, createEffect } from "solid-js";
import { useSelectedBinderContext } from "../../context/SelectedBinderContext";

export default function TestChild() {
  return (
    <div
      class="testChild"
      style={{ width: "100%", height: "100%", "background-color": "blue" }}
      onclick={() => {}}
    ></div>
  );
}
