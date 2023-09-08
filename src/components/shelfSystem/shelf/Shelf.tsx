import "./shelfStyles.css";
import Stack from "../stack/Stack";

interface ShelfInputs {
  binderList: string;
}

export default function Shelf({ binderList }: ShelfInputs) {
  return (
    <div class="shelfContainer">
      <div class="stackSlider">
        <Stack stackRef={`${binderList}`} stackFrom={`${binderList}`} />
      </div>
    </div>
  );
}
