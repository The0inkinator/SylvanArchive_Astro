import './shelfSceneStyles.css';
import Shelf from '../shelf/Shelf';
import { createSignal, createEffect, onMount, For } from 'solid-js';
import { useStackStateContext } from '../../../context/StackStateContext';

export default function ShelfScene() {
  const [shelfList, setShelfList] = createSignal<any[]>([]);
  const [stackState, { queueStack }]: any = useStackStateContext();

  onMount(() => {
    setShelfList((prevList) => [...prevList, <Shelf binderList="/colors" />]);

    newShelfCheck();
  });

  function newShelf(path: string) {
    if (stackState().stackQueued !== 'none') {
      setShelfList((prevList) => [
        ...prevList,
        () => {
          return <Shelf binderList={`${path}`} />;
        },
      ]);
      queueStack('none');
    }
  }

  const newShelfCheck = () => {
    function loop() {
      if (stackState().stackQueued === 'none') {
        setTimeout(loop, 100);
      } else {
        newShelf(stackState().stackQueued);
      }
    }
    loop();
  };

  return (
    <div>
      <For
        each={shelfList()}
        fallback={<div class="loadingStacksText">Loading stacks...</div>}
      >
        {(item) => <>{item}</>}
      </For>
    </div>
  );
}
