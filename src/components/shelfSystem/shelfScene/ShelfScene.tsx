import "./shelfSceneStyles.css";
import Shelf from "../shelf/Shelf";
import TestComponent from "../../testComponent/TestComponent";
import { StackDraggingProvider } from "../../../context/StackDraggingContext";
import { SelectedBinderProvider } from "../../../context/SelectedBinderContext";
import { ActiveStackProvider } from "../../../context/ActiveStackContext";

export default function ShelfScene() {
  return (
    <>
      <TestComponent />
      <Shelf shelfRef="1" />
      <Shelf shelfRef="2" />
    </>
  );
}
