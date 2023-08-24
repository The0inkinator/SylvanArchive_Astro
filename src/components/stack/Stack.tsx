import "./stackStyles.css";
import Binder from "../binder/Binder";
import { default as MapList } from "../../lists/colors";
import { createSignal, createEffect, onMount } from "solid-js";

let stackHandle: HTMLDivElement;
let time = 24;
type direction = "right" | "left" | "none";
type speed = number;
type time = number;
type momentumInputs = direction | speed | time;

const [handlePosition, setHandlePosition] = createSignal<number>(0);
const [newHandlePosition, setNewHandlePosition] = createSignal<number>(0);
const [handleDrift, setHandleDrift] = createSignal<number>(0);
const [handleMomentum, setHandleMomentum] = createSignal<momentumInputs[]>([
  "none",
  0,
  24,
]);
const [handleHovered, setHandleHovered] = createSignal<boolean>(false);
const [handleDragging, setHandleDragging] = createSignal<boolean>(false);
const [stackOffsetX, setStackOffsetX] = createSignal<number>(0);
const [stackWidth, setStackWidth] = createSignal<number>(0);
const [binderSize, setBinderSize] = createSignal<number>(0);

export default function Stack() {
  onMount(() => {
    const windowWidth = window.innerWidth;
    const rootStyles = getComputedStyle(stackHandle);
    const remSize = 16;
    setBinderSize(
      parseInt(rootStyles.getPropertyValue("--BinderSize")) * remSize
    );
    setStackWidth(MapList.length * binderSize());
    const stackStartingPos = () => {
      if (windowWidth - stackWidth() >= 0) {
        return windowWidth / 2 - stackWidth() / 2;
      } else {
        return (stackWidth() - windowWidth) / -2;
      }
    };
    setHandlePosition(stackStartingPos);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  });

  const handleMouseDown = (event: MouseEvent) => {
    if (handleHovered()) {
      setHandleDragging(true);
      setStackOffsetX(event.clientX - handlePosition());
    }
  };

  const slide = () => {
    function loop() {
      if ((handleMomentum()[2] as number) > 0) {
        const newNum = (handleMomentum()[2] as number) - 1;
        const newPos = () => {
          if (handleMomentum()[0] === "right") {
            return handlePosition() + parseInt(handleMomentum()[2] as string);
          } else if (handleMomentum()[0] === "left") {
            return handlePosition() - parseInt(handleMomentum()[2] as string);
          } else {
            return handlePosition();
          }
        };
        handleMomentum()[2] = newNum;
        setHandlePosition(newPos);
        setTimeout(loop, 10);
      }
    }
    loop();
  };

  const handleMouseUp = (event: MouseEvent) => {
    setHandleDragging(false);

    handleMomentum()[0] = (() => {
      if (handleDrift() - handlePosition() > 0) {
        return "left";
      } else if (handleDrift() - handlePosition() < 0) {
        return "right";
      } else {
        return "none";
      }
    })();
    handleMomentum()[1] = Math.abs(handleDrift() - handlePosition());
    handleMomentum()[2] = 24;
    console.log(handleMomentum());

    slide();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (handleDragging()) {
      const mousePosX = event.clientX;
      setNewHandlePosition(mousePosX - stackOffsetX());
      setHandlePosition(newHandlePosition());
      setTimeout(() => {
        setHandleDrift(newHandlePosition());
      }, 2);
    }
  };

  return (
    <div
      class="stackHandle"
      ref={stackHandle}
      onmouseenter={() => {
        setHandleHovered(true);
      }}
      onmouseleave={() => {
        setHandleHovered(false);
      }}
      style={{
        left: `${handlePosition()}px`,
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
