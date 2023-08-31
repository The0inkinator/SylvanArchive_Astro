import { createSignal, createContext, useContext } from 'solid-js';

const SelectedBinderContext = createContext();

interface binderInfo {
  number: number;
  bAddress: any;
  sAddress: any;
}

export function SelectedBinderProvider(props: any) {
  const [selectedBinder, setSelectedBinder] = createSignal<binderInfo>({
      number: 0,
      bAddress: null,
      sAddress: null,
    }),
    selectedBinderState = [
      selectedBinder,
      {
        setCurrentBinder(inputNumber: number) {
          setSelectedBinder({
            number: inputNumber,
            bAddress: selectedBinder().bAddress,
            sAddress: selectedBinder().sAddress,
          });
        },
        setBinderAddress(inputAddress: any) {
          setSelectedBinder({
            number: selectedBinder().number,
            bAddress: inputAddress,
            sAddress: selectedBinder().sAddress,
          });
        },
        setStackAddress(inputAddress: any) {
          setSelectedBinder({
            number: selectedBinder().number,
            bAddress: selectedBinder().bAddress,
            sAddress: inputAddress,
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
