import './shelfStyles.css';
import Stack from '../stack/Stack';
// import { StackDraggingProvider } from '../../context/StackDraggingContext';
// import { SelectedBinderProvider } from '../../context/SelectedBinderContext';
// import { ActiveStackProvider } from '../../context/ActiveStackContext';

interface ShelfInputs {
  shelfRef: string;
  shelfFrom?: string;
  shelfTo?: string;
}

export default function Shelf({ shelfRef, shelfFrom, shelfTo }: ShelfInputs) {
  return (
    // <SelectedBinderProvider selectedBinderState={0}>
    //   <StackDraggingProvider dragState={'still'}>
    //     <ActiveStackProvider activeStackState={null}>
          <div class="shelfContainer">
            <div class="stackSlider">
              <Stack stackRef={`${shelfRef}`} />
            </div>
          </div>
        {/* </ActiveStackProvider>
      </StackDraggingProvider>
    </SelectedBinderProvider> */}
  );
}
