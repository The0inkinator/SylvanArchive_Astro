import './shelfSceneStyles.css';
import Shelf from '../shelf/Shelf';
import TestComponent from '../../testComponent/TestComponent';
import { createSignal, onMount, For } from 'solid-js';

export default function ShelfScene() {
  const [shelfList, setShelfList] = createSignal<any[]>([]);

  onMount(() => {
    setShelfList((prevList) => [
      ...prevList,
      <TestComponent />,
      <Shelf shelfRef="1" />,
      <Shelf shelfRef="2" />,
    ]);
  });

  function newShelf() {
    setShelfList((prevList) => [
      ...prevList,
      () => {
        return <Shelf shelfRef="3" />;
      },
    ]);
  }

  return (
    <div
      style={{ 'background-color': 'red' }}
      onclick={() => {
        newShelf();
      }}
    >
      {shelfList().map((component) => {
        return component;
      })}
    </div>
  );
}
