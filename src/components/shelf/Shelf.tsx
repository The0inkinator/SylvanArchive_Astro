import './shelfStyles.css';
import Stack from '../stack/Stack';
import { ShelfContextProvider } from '../../context/ShelfContext';

interface ShelfInputs {
  shelfRef: string;
  shelfFrom?: string;
  shelfTo?: string;
}

export default function Shelf({ shelfRef, shelfFrom, shelfTo }: ShelfInputs) {
  return (
    <ShelfContextProvider dragState={'still'}>
      <div class="shelfContainer">
        <div class="stackSlider">
          <Stack stackRef={`${shelfRef}`} />
        </div>
      </div>
    </ShelfContextProvider>
  );
}
