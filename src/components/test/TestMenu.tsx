import { createSignal, createEffect } from 'solid-js';
import { createScrollPosition } from '@solid-primitives/scroll';
import './testMenuStyles.css';

const [hovered, setHovered] = createSignal(1);

const windowScroll = createScrollPosition();

const item1Hovered = () => setHovered(1);
const item2Hovered = () => setHovered(2);
const item3Hovered = () => setHovered(3);
const itemUnHovered = () => {
  if (windowScroll.y > 0) {
    setHovered(0);
  } else {
    setHovered(1);
  }
};

export default function TestMenu() {
  createEffect(() => {
    if (windowScroll.y > 0) {
      setHovered(0);
    } else {
      setHovered(1);
    }
  });

  return (
    <>
      <div class="menuContainer">
        <div
          onMouseEnter={() => item1Hovered()}
          onMouseLeave={() => itemUnHovered()}
          classList={{ hoveredButton: hovered() === 1, button: true }}
        ></div>
        <div
          class="button"
          onMouseEnter={() => item2Hovered()}
          onMouseLeave={() => itemUnHovered()}
          classList={{ hoveredButton: hovered() === 2 }}
        ></div>
        <div
          class="button"
          onMouseEnter={() => item3Hovered()}
          onMouseLeave={() => itemUnHovered()}
          classList={{ hoveredButton: hovered() === 3 }}
        ></div>
      </div>
    </>
  );
}
