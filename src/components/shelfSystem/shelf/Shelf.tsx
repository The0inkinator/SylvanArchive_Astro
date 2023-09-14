import "./shelfStyles.css";
import Stack from "../stack/Stack";
import { useStackStateContext } from "../../../context/StackStateContext";
import { createSignal, onMount } from "solid-js";

interface ShelfInputs {
  binderList: string;
}

export default function Shelf({ binderList }: ShelfInputs) {
  const [upperMargin, setUpperMargin] = createSignal<number>(0);
  const [stackState]: any = useStackStateContext();

  onMount(() => {
    if (stackState().stackCount === 0) {
      setUpperMargin(100);
    } else {
      setUpperMargin(0);
    }
  });

  return (
    <div
      class="shelfContainer"
      style={{
        "margin-top": upperMargin() > 0 ? `${upperMargin()}px` : "0px",
      }}
    >
      <div class="stackSlider">
        <Stack stackRef={`${binderList}`} stackFrom={`${binderList}`} />
      </div>
    </div>
  );
}
