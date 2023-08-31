import { createSignal, createContext, useContext } from 'solid-js';

const ActiveStackContext = createContext();

export function ActiveStackProvider(props: any) {
  const [activeStack, setActiveStack] = createSignal<any>(null),
    activeStackState = [
      activeStack,
      {
        changeActiveStack(inputNumber: number) {
          setActiveStack(inputNumber);
        },
      },
    ];

  return (
    <ActiveStackContext.Provider value={activeStackState}>
      {props.children}
    </ActiveStackContext.Provider>
  );
}

export function useActiveStackContext() {
  return useContext(ActiveStackContext);
}
