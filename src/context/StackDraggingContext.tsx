import { createSignal, createContext, useContext } from "solid-js";

const StackDraggingContext = createContext();

export function StackDraggingProvider(props: any) {
  const [stackDragging, setStackDragging] = createSignal<
      "still" | "dragging" | "drifting"
    >("still"),
    stackDragState = [
      stackDragging,
      {
        dragToStill() {
          setStackDragging("still");
        },
        dragToDragging() {
          setStackDragging("dragging");
        },
        dragToDrifting() {
          setStackDragging("drifting");
        },
      },
    ];

  return (
    <StackDraggingContext.Provider value={stackDragState}>
      {props.children}
    </StackDraggingContext.Provider>
  );
}

export function useStackDraggingContext() {
  return useContext(StackDraggingContext);
}