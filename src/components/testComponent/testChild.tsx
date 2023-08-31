import { JSX, createEffect } from 'solid-js';
import { useSelectedBinderContext } from '../../context/SelectedBinderContext';

export default function TestChild() {
  const [selectedBinder, { setBinderAddress }]: any =
    useSelectedBinderContext();
  return (
    <div
      class="testChild"
      style={{ width: '100%', height: '100%', 'background-color': 'blue' }}
      onclick={() => {
        console.log(selectedBinder());
        setBinderAddress(1);
      }}
    ></div>
  );
}
