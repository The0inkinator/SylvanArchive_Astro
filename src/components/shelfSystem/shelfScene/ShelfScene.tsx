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
import { useStackDraggingContext } from "../../../context/StackDraggingContext";
import BackButton from "../backButton/BackButton";

export default function ShelfScene() {
  const [shelfList, setShelfList] = createSignal<any[]>([]);
  const [stackState, { queueStack, closeXStacks, addToStackCount }]: any =
    useStackStateContext();
  const [binderState, { setHoveredBinder, setSelectedBinder }]: any =
    useBinderStateContext();
  const [stackDragging, { dragToStill }]: any = useStackDraggingContext();

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

  function closeStacks(inputNumber: number) {
    const shelfListLength = shelfList().length;
    const tempShelfArray = shelfList().slice(0, -2);
    const newShelfArray = shelfList().slice(0, -1);
    addToStackCount(-2);
    dragToStill();

    if (shelfListLength <= 2) {
      closeXStacks(0);

      setShelfList([
        () => {
          return <Shelf binderList="" />;
        },
      ]);
    } else {
      closeXStacks(0);

      setShelfList(tempShelfArray);
      setShelfList(newShelfArray);
    }
  }

  const updateStacks = () => {
    function loop() {
      if (stackState().stacksToClose > 0) {
        closeStacks(stackState().stacksToClose);
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
          {(item) => <div>{item()}</div>}
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
