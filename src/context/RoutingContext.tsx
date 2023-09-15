import { createSignal, createContext, useContext } from "solid-js";

const RoutingDataContext = createContext();

interface routingData {
  file: any[];
  routing: any[];
}

export function RoutingProvider(props: any) {
  const [routingData, setRoutingData] = createSignal<routingData>({
      file: [],
      routing: [],
    }),
    routingInfo = [
      routingData,
      {
        updateRoutingFiles(input: any) {
          setRoutingData({ file: input, routing: routingData().routing });
        },
        updateRoutingInfo(input: any) {
          setRoutingData({ file: routingData().file, routing: input });
        },
      },
    ];

  return (
    <RoutingDataContext.Provider value={routingInfo}>
      {props.children}
    </RoutingDataContext.Provider>
  );
}

export function useRoutingDataContext() {
  return useContext(RoutingDataContext);
}
