import { createSignal, createContext, useContext } from 'solid-js';

const StackStateContext = createContext();

interface stackInfo {
  activeStack: any;
  stackQueued: string | 'none';
}

export function StackStateProvider(props: any) {
  const [stackState, setStackState] = createSignal<stackInfo>({
      activeStack: null,
      stackQueued: 'none',
    }),
    stackStateList = [
      stackState,
      {
        changeActiveStack(input: any) {
          setStackState({
            activeStack: input,
            stackQueued: stackState().stackQueued,
          });
        },
        queueStack(inputPath: string | 'none') {
          setStackState({
            activeStack: stackState().activeStack,
            stackQueued: inputPath,
          });
        },
      },
    ];

  return (
    <StackStateContext.Provider value={stackStateList}>
      {props.children}
    </StackStateContext.Provider>
  );
}

export function useStackStateContext() {
  return useContext(StackStateContext);
}
