import "./shelfStyles.css";
import Stack from "../stack/Stack";

interface ShelfInputs {
  shelfRef: string;
}

export default function Shelf({ shelfRef }: ShelfInputs) {
  return (
    <div class="shelfContainer">
      <div class="stackSlider">
        <Stack stackRef={`${shelfRef}`} />
      </div>
    </div>
  );
}
