import './stackStyles.css';
import Binder from '../binder/Binder';
import { default as MapList } from '../../lists/colors';
import { createSignal, createEffect, onMount } from 'solid-js';

let stackHandle: HTMLDivElement;
let time = 24;

const [stackPosition, setStackPosition] = createSignal<number>(0);
const [newStackPosition, setNewStackPosition] = createSignal<number>(0);
const [stackDrift, setStackDrift] = createSignal<number>(0);
const [stackDriftSpeed, setStackDriftSpeed] = createSignal<number>(0);
const [stackHovered, setStackHovered] = createSignal<boolean>(false);
const [stackDragging, setStackDragging] = createSignal<
  'still' | 'dragging' | 'drifting'
>('still');
const [stackOffsetX, setStackOffsetX] = createSignal<number>(0);
const [stackWidth, setStackWidth] = createSignal<number>(0);
const [binderSize, setBinderSize] = createSignal<number>(0);

export default function Stack() {
  onMount(() => {
    const windowWidth = window.innerWidth;
    const rootStyles = getComputedStyle(stackHandle);
    const remSize = 16;
    setBinderSize(
      parseInt(rootStyles.getPropertyValue('--BinderSize')) * remSize
    );
    setStackWidth(MapList.length * binderSize());
    const stackStartingPos = () => {
      if (windowWidth - stackWidth() >= 0) {
        return windowWidth / 2 - stackWidth() / 2;
      } else {
        return (stackWidth() - windowWidth) / -2;
      }
    };
    setStackPosition(stackStartingPos);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  });

  function slide() {
    function loop() {
      if (stackDragging() === 'dragging') {
        setStackDriftSpeed(stackDrift() - stackPosition());
        const newStackDrift = stackPosition();
        setStackDrift(newStackDrift);
        setTimeout(loop, 20);
      } else if (stackDragging() === 'drifting') {
        if (Math.abs(stackDriftSpeed()) > 1) {
          const newStackSpeed = stackDriftSpeed() - stackDriftSpeed() / 4;
          const newStackPos = (() => {
            if (newStackSpeed > 0) {
              return stackPosition() - Math.abs(newStackSpeed);
            } else if (newStackSpeed < 0) {
              return stackPosition() + Math.abs(newStackSpeed);
            }
          })();
          console.log(newStackPos);
          setStackPosition(newStackPos as number);
          setStackDriftSpeed(newStackSpeed);
          setTimeout(loop, 20);
        } else if (stackDragging() === 'drifting' && stackDriftSpeed() < 1) {
          setStackDragging('still');
          setStackDriftSpeed(0);
        }
      }
    }
    loop();
  }

  const handleMouseDown = (event: MouseEvent) => {
    if (stackHovered()) {
      setStackDragging('dragging');
      setStackOffsetX(event.clientX - stackPosition());
      slide();
    }
  };

  // const slide = () => {
  //   function loop() {
  //     if ((handleMomentum()[2] as number) > 0) {
  //       const newNum = (handleMomentum()[2] as number) - 1;
  //       const newPos = () => {
  //         if (handleMomentum()[0] === "right") {
  //           return handlePosition() + parseInt(handleMomentum()[2] as string);
  //         } else if (handleMomentum()[0] === "left") {
  //           return handlePosition() - parseInt(handleMomentum()[2] as string);
  //         } else {
  //           return handlePosition();
  //         }
  //       };
  //       handleMomentum()[2] = newNum;
  //       setHandlePosition(newPos);
  //       setTimeout(loop, 10);
  //     }
  //   }
  //   loop();
  // };

  const handleMouseUp = (event: MouseEvent) => {
    setStackDragging('drifting');

    // handleMomentum()[0] = (() => {
    //   if (handleDrift() - handlePosition() > 0) {
    //     return "left";
    //   } else if (handleDrift() - handlePosition() < 0) {
    //     return "right";
    //   } else {
    //     return "none";
    //   }
    // })();
    // handleMomentum()[1] = Math.abs(handleDrift() - handlePosition());
    // handleMomentum()[2] = 24;
    // console.log(handleMomentum());

    // slide();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (stackDragging() === 'dragging') {
      const mousePosX = event.clientX;
      setNewStackPosition(mousePosX - stackOffsetX());
      setStackPosition(newStackPosition());
    }
  };

  return (
    <div
      class="stackHandle"
      ref={stackHandle}
      onmouseenter={() => {
        setStackHovered(true);
      }}
      onmouseleave={() => {
        setStackHovered(false);
      }}
      style={{
        left: `${stackPosition()}px`,
        width: `${stackWidth()}px`,
      }}
    >
      <div class="test">
        {MapList.map((gridCard, gridCardIndex) => {
          const tempBgCardList = gridCard.bgCards?.map((bgCard) => {
            return {
              cardName: bgCard.cardName,
              cardSet: bgCard.cardSet,
              cardCollectNum: bgCard.cardCollectNum,
              cardFace: bgCard.cardFace,
            };
          });
          return (
            <Binder
              title={gridCard.title}
              displayArt={{
                cardName: gridCard.displayArt.cardName,
                cardSet: gridCard.displayArt?.cardSet,
                cardCollectNum: gridCard.displayArt?.cardCollectNum,
                cardFace: gridCard.displayArt?.cardFace,
              }}
              bgCards={tempBgCardList}
            />
          );
        })}
      </div>
    </div>
  );
}
