import { createSignal, onMount } from "solid-js";
import "./backButtonStyles.css";
import { useStackStateContext } from "../../../context/StackStateContext";

export default function BackButton() {
  const [opacity, setOpacity] = createSignal<number>(0);
  const [stackState, { closeStack }]: any = useStackStateContext();
  onMount(() => {
    function makeButtonVisible() {
      setOpacity(100);
    }
    setTimeout(makeButtonVisible, 250);
  });
  return (
    <button
      onClick={() => {
        closeStack(1);
        console.log(stackState());
      }}
      tabIndex={-1}
      classList={{ backButton: true }}
      style={{ opacity: `${opacity()}%` }}
    ></button>
  );
}
