import { createSignal, onMount } from "solid-js";
import "./backButtonStyles.css";

export default function BackButton() {
  const [opacity, setOpacity] = createSignal<number>(0);
  onMount(() => {
    function makeButtonVisible() {
      setOpacity(100);
    }
    setTimeout(makeButtonVisible, 250);
  });
  return (
    <button
      tabIndex={-1}
      classList={{ backButton: true }}
      style={{ opacity: `${opacity()}%` }}
    ></button>
  );
}
