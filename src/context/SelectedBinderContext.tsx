import { createSignal, createContext, useContext } from 'solid-js';

const SelectedBinderContext = createContext();

interface binderInfo {
  hoveredBinder: number;
  selectedBinder: number;
}

export function SelectedBinderProvider(props: any) {
  const [selectedBinder, setSelectedBinder] = createSignal<binderInfo>({
      hoveredBinder: 0,
      selectedBinder: 0,
    }),
    selectedBinderState = [
      selectedBinder,
      {
        setCurrentBinder(inputNumber: number) {
          setSelectedBinder({
            hoveredBinder: selectedBinder().hoveredBinder,
            selectedBinder: inputNumber,
          });
        },
        setHoveredBinder(inputNumber: number) {
          setSelectedBinder({
            hoveredBinder: inputNumber,
            selectedBinder: selectedBinder().selectedBinder,
          });
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
