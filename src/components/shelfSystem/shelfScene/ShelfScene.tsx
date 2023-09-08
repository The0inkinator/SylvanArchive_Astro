import "./shelfSceneStyles.css";
import Shelf from "../shelf/Shelf";
import { createSignal, onMount, For } from "solid-js";

export default function ShelfScene() {
  const [shelfList, setShelfList] = createSignal<any[]>([]);

  onMount(() => {
    setShelfList((prevList) => [
      ...prevList,
      <Shelf binderList="/colors" />,
      // <Shelf binderList="2" />,
    ]);
  });

  function newShelf(path: string) {
    setShelfList((prevList) => [
      ...prevList,
      () => {
        return <Shelf binderList={`${path}`} />;
      },
    ]);
  }

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
