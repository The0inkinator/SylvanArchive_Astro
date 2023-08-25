import "./shelfStyles.css";
import Stack from "../stack/Stack";
import { DraggingProvider } from "../../context/DraggingContex";

interface ShelfInputs {
  shelfRef: string;
  shelfFrom?: string;
  shelfTo?: string;
}

export default function Shelf({ shelfRef, shelfFrom, shelfTo }: ShelfInputs) {
  return (
    <DraggingProvider dragState={"still"}>
      <div class="shelfContainer">
        <div class="stackSlider">
          <Stack stackRef={`${shelfRef}`} />
        </div>
      </div>
    </DraggingProvider>
  );
}
