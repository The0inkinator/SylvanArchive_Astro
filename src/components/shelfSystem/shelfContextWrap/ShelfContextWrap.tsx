import { StackDraggingProvider } from "../../../context/StackDraggingContext";
import { BinderStateProvider } from "../../../context/BinderStateContext";
import { ActiveStackProvider } from "../../../context/ActiveStackContext";
import ShelfScene from "../shelfScene/ShelfScene";

export default function ShelfContextWrap() {
  return (
    <StackDraggingProvider dragState={"still"}>
      <BinderStateProvider binderStateList={0}>
        <ActiveStackProvider activeStackState={null}>
          <ShelfScene />
        </ActiveStackProvider>
      </BinderStateProvider>
    </StackDraggingProvider>
  );
}
