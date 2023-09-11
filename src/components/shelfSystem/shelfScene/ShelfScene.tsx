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
  const [stackState, { queueStack }]: any = useStackStateContext();
  const [binderState, { setHoveredBinder, setSelectedBinder }]: any =
    useBinderStateContext();

  onMount(() => {
    setShelfList((prevList) => [...prevList, <Shelf binderList="" />]);

    newShelfCheck();
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

  const newShelfCheck = () => {
    function loop() {
      if (stackState().queuedStack === "none") {
        setTimeout(loop, 100);
      } else {
        newShelf(stackState().queuedStack);
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
