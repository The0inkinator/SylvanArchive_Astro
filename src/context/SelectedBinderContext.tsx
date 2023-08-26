import { createSignal, createContext, useContext } from "solid-js";

const SelectedBinderContext = createContext();

export function SelectedBinderProvider(props: any) {
  const [selectedBinder, setSelectedBinder] = createSignal<number>(0),
    selectedBinderState = [
      selectedBinder,
      {
        SetCurrentBinder(number: number) {
          setSelectedBinder(number);
        },
      },
    ];

  return (
    <SelectedBinderContext.Provider value={selectedBinderState}>
      {props.children}
    </SelectedBinderContext.Provider>
  );
}

export function useSelectedBinderContext() {
  return useContext(SelectedBinderContext);
}
