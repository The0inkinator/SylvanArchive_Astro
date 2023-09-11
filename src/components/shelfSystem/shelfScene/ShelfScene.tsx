import "./shelfSceneStyles.css";
import Shelf from "../shelf/Shelf";
import {
  createSignal,
  createEffect,
  onMount,
  For,
  Switch,
  Match,
} from "solid-js";
import { useStackStateContext } from "../../../context/StackStateContext";
import { useBinderStateContext } from "../../../context/BinderStateContext";
import BackButton from "../backButton/BackButton";

export default function ShelfScene() {
  const [shelfList, setShelfList] = createSignal<any[]>([]);
  const [stackState, { queueStack, closeXStacks }]: any =
    useStackStateContext();
  const [binderState, { setHoveredBinder, setSelectedBinder }]: any =
    useBinderStateContext();

  onMount(() => {
    setShelfList((prevList) => [...prevList, <Shelf binderList="" />]);
    updateStacks();
  });

  function newShelf(path: string) {
    if (stackState().queuedStack !== "none") {
      setShelfList((prevList) => [
        ...prevList,
        () => {
          return <Shelf binderList={`${path}`} />;
        },
      ]);
      queueStack("none");
    }
  }

  function closeStacks() {
    console.log(shelfList());

    const newShelfArray = shelfList().slice(0, -1);
    console.log(newShelfArray);
    setShelfList(newShelfArray);
    closeXStacks(0);
  }

  const updateStacks = () => {
    function loop() {
      if (stackState().stacksToClose > 0) {
        closeStacks();
        setTimeout(loop, 100);
      } else if (stackState().queuedStack !== "none") {
        newShelf(stackState().queuedStack);
        setTimeout(loop, 100);
      } else {
        setTimeout(loop, 100);
      }
    }
    loop();
  };

  return (
    <>
      <div>
        <For
          each={shelfList()}
          fallback={<div class="loadingStacksText">Loading stacks...</div>}
        >
          {(item) => <>{item}</>}
        </For>
      </div>
      <Switch fallback={<></>}>
        <Match when={stackState().stackCount > 1}>
          <BackButton />
        </Match>
      </Switch>
    </>
  );
}
