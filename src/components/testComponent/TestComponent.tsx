import "./testComponentStyle.css";
import TestChild from "./testChild";
import { useActiveStackContext } from "../../context/ActiveStackContext";

export default function TestComponent() {
  const [activeStack]: any = useActiveStackContext();
  return (
    <div
      class="testComponent"
      onclick={() => {
        console.log(activeStack());
      }}
    >
      <TestChild />
    </div>
  );
}
