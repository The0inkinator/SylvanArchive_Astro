import { createSignal, createEffect } from "solid-js";
import "./testComponentStyle.css";
import TestChild from "./testChild";

export default function TestComponent() {
  const [hovered, setHovered] = createSignal<"one" | "two" | "three">("one");

  return (
    <div
      class="testComponent"
      onMouseEnter={() => {
        setHovered("one");
      }}
      onmouseleave={() => {
        setHovered("two");
      }}
      onclick={() => {
        setHovered("three");
      }}
    >
      <TestChild hovered={hovered()} />
    </div>
  );
}
