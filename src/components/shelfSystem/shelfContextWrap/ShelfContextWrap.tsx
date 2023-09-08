import { StackDraggingProvider } from '../../../context/StackDraggingContext';
import { BinderStateProvider } from '../../../context/BinderStateContext';

import { StackStateProvider } from '../../../context/StackStateContext';
import ShelfScene from '../shelfScene/ShelfScene';

export default function ShelfContextWrap() {
  return (
    <StackDraggingProvider dragState={'still'}>
      <BinderStateProvider binderStateList={0}>
        <StackStateProvider stackStateList={null}>
          <ShelfScene />
        </StackStateProvider>
      </BinderStateProvider>
    </StackDraggingProvider>
  );
}
