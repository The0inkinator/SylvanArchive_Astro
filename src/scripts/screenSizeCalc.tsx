import { createEffect, createSignal, onCleanup } from 'solid-js';

type ScreenSizes = 'Desktop' | 'LaptopTablet' | 'Mobile';

export const [screenSize, setScreenSize] = createSignal('Desktop');

export function CurrentScreenSize() {
  function getScreenSize(width: number): ScreenSizes {
    if (width >= 1025) {
      return 'Desktop';
    } else if (width >= 481) {
      return 'LaptopTablet';
    } else {
      return 'Mobile';
    }
  }

  createEffect(() => {
    const handleScreenSize = () => {
      setScreenSize(getScreenSize(window.innerWidth));
    };

    window.addEventListener('resize', handleScreenSize);

    onCleanup(() => {
      window.removeEventListener('resize', handleScreenSize);
    });
  });
}
