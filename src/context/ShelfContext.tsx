import { createSignal, createContext, useContext } from 'solid-js';

const ShelfContext = createContext();

export function ShelfContextProvider(props: any) {
  const [stackDragging, setStackDragging] = createSignal<
      'still' | 'dragging' | 'drifting'
    >('still'),
    stackDragState = [
      stackDragging,
      {
        dragToStill() {
          setStackDragging('still');
        },
        dragToDragging() {
          setStackDragging('dragging');
        },
        dragToDrifting() {
          setStackDragging('drifting');
        },
      },
    ];

  return (
    <ShelfContext.Provider value={stackDragState}>
      {props.children}
    </ShelfContext.Provider>
  );
}

export function useShelfContext() {
  return useContext(ShelfContext);
}
