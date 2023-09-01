import { StackDraggingProvider } from '../../../context/StackDraggingContext';
import { SelectedBinderProvider } from '../../../context/SelectedBinderContext';
import { ActiveStackProvider } from '../../../context/ActiveStackContext';
import ShelfScene from '../shelfScene/ShelfScene';

export default function ShelfContextWrap() {
  return (
    <StackDraggingProvider dragState={'still'}>
      <SelectedBinderProvider selectedBinderState={0}>
        <ActiveStackProvider activeStackState={null}>
          <ShelfScene />
        </ActiveStackProvider>
      </SelectedBinderProvider>
    </StackDraggingProvider>
  );
}
