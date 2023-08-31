import "./shelfSceneStyles.css";
import Shelf from "../shelf/Shelf";
import { StackDraggingProvider } from "../../context/StackDraggingContext";
import { SelectedBinderProvider } from "../../context/SelectedBinderContext";
import { ActiveStackProvider } from "../../context/ActiveStackContext";

export default function ShelfScene() {
  return (
    <StackDraggingProvider dragState={"still"}>
      <SelectedBinderProvider selectedBinderState={0}>
        <ActiveStackProvider activeStackState={null}>
          <Shelf shelfRef="1" />
          <Shelf shelfRef="2" />
        </ActiveStackProvider>
      </SelectedBinderProvider>
    </StackDraggingProvider>
  );
}
