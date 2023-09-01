import './shelfSceneStyles.css';
import Shelf from '../shelf/Shelf';
import TestComponent from '../../testComponent/TestComponent';
import { createSignal, onMount, For } from 'solid-js';

export default function ShelfScene() {
  const [shelfList, setShelfList] = createSignal<any[]>([]);

  onMount(() => {
    setShelfList((prevList) => [
      ...prevList,
      <Shelf binderList="/colors" />,
      // <Shelf binderList="2" />,
    ]);
  });

  function newShelf() {
    setShelfList((prevList) => [
      ...prevList,
      () => {
        return <Shelf binderList="colors" />;
      },
    ]);
  }

  return (
    <div>
      <For each={shelfList()} fallback={<div>Loading stacks...</div>}>
        {(item) => <>{item}</>}
      </For>
    </div>
  );
}
