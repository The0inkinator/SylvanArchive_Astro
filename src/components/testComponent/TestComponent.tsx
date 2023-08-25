import { createSignal, createEffect } from "solid-js";
import "./testComponentStyle.css";
import TestChild from "./testChild";

export default function TestComponent() {
  const [hovered, setHovered] = createSignal<boolean>(false);

  createEffect(() => {
    console.log(hovered());
  });
  return (
    <div
      class="testComponent"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onmouseleave={() => {
        setHovered(false);
      }}
    >
      <TestChild hovered={hovered()} />
    </div>
  );
}
