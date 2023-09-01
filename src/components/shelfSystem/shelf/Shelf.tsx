import "./shelfStyles.css";
import Stack from "../stack/Stack";

interface ShelfInputs {
  shelfRef: string;
  shelfFrom?: string;
  shelfTo?: string;
}

export default function Shelf({ shelfRef, shelfFrom, shelfTo }: ShelfInputs) {
  return (
    <div class="shelfContainer">
      <div class="stackSlider">
        <Stack stackRef={`${shelfRef}`} />
      </div>
    </div>
  );
}
