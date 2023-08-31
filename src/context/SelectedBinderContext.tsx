import { createSignal, createContext, useContext } from 'solid-js';

const SelectedBinderContext = createContext();

interface binderInfo {
  number: number;
  bAddress: any;
  sAddress: any;
}

export function SelectedBinderProvider(props: any) {
  const [selectedBinder, setSelectedBinder] = createSignal<number>(0),
    selectedBinderState = [
      selectedBinder,
      {
        setCurrentBinder(inputNumber: number) {
          setSelectedBinder(inputNumber);
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
