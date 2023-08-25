import { createSignal, createContext, useContext } from "solid-js";

const DraggingContext = createContext();

export function DraggingProvider(props: any) {
  const [stackDragging, setStackDragging] = createSignal<
      "still" | "dragging" | "drifting"
    >("still"),
    dragState = [
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
    <DraggingContext.Provider value={dragState}>
      {props.children}
    </DraggingContext.Provider>
  );
}

export function useDragging() {
  return useContext(DraggingContext);
}
