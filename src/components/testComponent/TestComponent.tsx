import "./testComponentStyle.css";
import { createEffect, createSignal, onMount } from "solid-js";
interface TestInputs {
  left: number;
  ref?: string;
}

let thisRef: HTMLDivElement;

export default function TestComponent({ left, ref }: TestInputs) {
  const [testHovered, setTestHovered] = createSignal<boolean>(false);
  const [cursorType, setCursorType] = createSignal<
    "auto" | "grab" | "grabbing"
  >("auto");

  createEffect(() => {
    if (testHovered()) {
      setCursorType("grab");
    } else {
      setCursorType("auto");
    }
  });

  return (
    <div
      class="testClass"
      ref={thisRef}
      style={{ left: `${left}%`, cursor: `${cursorType()}` }}
      onmouseenter={() => {
        setTestHovered(true);
      }}
      onmouseleave={() => {
        setTestHovered(false);
      }}
    ></div>
  );
}
