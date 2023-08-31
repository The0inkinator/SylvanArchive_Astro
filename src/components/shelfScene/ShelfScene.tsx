import './shelfSceneStyles.css';
import Stack from '../stack/Stack';
import { StackDraggingProvider } from '../../context/StackDraggingContext';
import { SelectedBinderProvider } from '../../context/SelectedBinderContext';
import { ActiveStackProvider } from '../../context/ActiveStackContext';

export default function ShelfScene() {
  return (
    <StackDraggingProvider dragState={'still'}>
      <SelectedBinderProvider selectedBinderState={0}>
        <ActiveStackProvider activeStackState={null}>
          <div>hello</div>
        </ActiveStackProvider>
      </SelectedBinderProvider>
    </StackDraggingProvider>
  );
}
