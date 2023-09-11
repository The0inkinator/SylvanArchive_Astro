import { createSignal, createContext, useContext } from "solid-js";

const StackStateContext = createContext();

interface stackInfo {
  activeStack: any;
  queuedStack: string | "none";
  stackCount: number;
  closeStacks: number;
}

export function StackStateProvider(props: any) {
  const [stackState, setStackState] = createSignal<stackInfo>({
      activeStack: null,
      queuedStack: "none",
      stackCount: 0,
      closeStacks: 0,
    }),
    stackStateList = [
      stackState,
      {
        changeActiveStack(input: any) {
          setStackState({
            activeStack: input,
            queuedStack: stackState().queuedStack,
            stackCount: stackState().stackCount,
            closeStacks: stackState().closeStacks,
          });
        },
        queueStack(inputPath: string | "none") {
          setStackState({
            activeStack: stackState().activeStack,
            queuedStack: inputPath,
            stackCount: stackState().stackCount,
            closeStacks: stackState().closeStacks,
          });
        },
        addToStackCount() {
          setStackState({
            activeStack: stackState().activeStack,
            queuedStack: stackState().queuedStack,
            stackCount: stackState().stackCount + 1,
            closeStacks: stackState().closeStacks,
          });
        },
        closeStack(inputNumber: number) {
          setStackState({
            activeStack: stackState().activeStack,
            queuedStack: stackState().queuedStack,
            stackCount: stackState().stackCount,
            closeStacks: inputNumber,
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
