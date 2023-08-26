import "./stackStyles.css";
import Binder from "../binder/Binder";
import { default as MapList } from "../../lists/colors";
import { createSignal, createEffect, onMount, onCleanup } from "solid-js";
import { useStackDraggingContext } from "../../context/StackDraggingContext";
import { useSelectedBinderContext } from "../../context/SelectedBinderContext";
import {
  screenSize,
  setScreenSize,
  getScreenSize,
} from "../floatingMenu/FloatingMenu";

interface StackInputs {
  stackRef: string;
  stackFrom?: string;
  stackTo?: string;
}

let stackHandle: HTMLDivElement;
export const [selectedBinder, setSelectedBinder] = createSignal<number>(0);

export default function Stack({ stackRef, stackFrom, stackTo }: StackInputs) {
  //Property to track the pixel width of cards that the stack is made of
  const [binderSize, setBinderSize] = createSignal<number>(0);
  //Property to track the pixel width of the whole stack
  const [stackWidth, setStackWidth] = createSignal<number>(0);
  //Property to find the distance from mouse to stack corner
  const [stackOffsetX, setStackOffsetX] = createSignal<number>(0);
  //Tracks if mouse is over stack updated with a create effect in the body of the function
  let stackHovered: boolean = false;
  //3 States: Still = no movement
  //Dragging = mouse clicked and component moving, Drifting = mouse unclicked component "slowing down"
  const [stackDragging, { dragToStill, dragToDragging, dragToDrifting }]: any =
    useStackDraggingContext();
  //Number that directly controls where the stack is on screen through its "left" style
  const [stackPosition, setStackPosition] = createSignal<number>(0);
  //Secondary position for the handleMouseMove function
  const [newStackPosition, setNewStackPosition] = createSignal<number>(0);
  //Number that stores the most recent position of the stack to calculate its speed
  const [stackDrift, setStackDrift] = createSignal<number>(0);
  //Number that represents how fast the stack was being dragged when it is released
  const [stackDriftSpeed, setStackDriftSpeed] = createSignal<number>(0);
  //Object that marks the farthest the stack can be dragged left or right
  const [stackCollision, setStackCollision] = createSignal<{
    left: number;
    right: number;
  }>({ left: 0, right: 0 });
  //State for currently selected binder
  const [selectedBinder]: any = useSelectedBinderContext();
  //State for slide function
  const [selectedBinderPosition, setSelectedBinderPosition] =
    createSignal<number>(0);

  //testing stuff

  //Function that: Sets the stack pixel width, Positions the stack in the screen center, sets the collision boundries for the stack
  //Called both on mount and on screen resize
  function setDefaults() {
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
    setStackPosition(stackStartingPos);
    const collisionLeft = windowWidth / 2 - binderSize() / 2;
    const collisionRight = windowWidth / 2 - (stackWidth() - binderSize() / 2);
    setStackCollision({ left: collisionLeft, right: collisionRight });
  }

  //Calls setDefaults and adds event listeners to handle clicking and dragging of the stack
  onMount(() => {
    setDefaults();
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  });

  //handles mouseDown
  const handleMouseDown = (event: MouseEvent) => {
    if (stackHovered) {
      dragToDragging();
      setStackOffsetX(event.clientX - stackPosition());
      // setCursorType("grabbing");
      document.body.style.cursor = "grabbing";
      //calls drift function which handles the tracking and styling for the ice-rink effect
      drift();
    }
  };

  //handles mouseMove
  const handleMouseMove = (event: MouseEvent) => {
    if (stackDragging() === "dragging") {
      const mousePosX = event.clientX;
      setNewStackPosition(collisionCheck(mousePosX - stackOffsetX()));
      setStackPosition(collisionCheck(newStackPosition()));
    }
  };

  //handles mouseUp
  const handleMouseUp = (event: MouseEvent) => {
    if (!stackHovered) {
      document.body.style.cursor = "auto";
    } else {
      document.body.style.cursor = "grab";
    }
    dragToDrifting();
  };

  //handles window resize to update all relevant properties
  createEffect(() => {
    window.addEventListener("resize", setDefaults);

    onCleanup(() => {
      window.removeEventListener("resize", setDefaults);
    });
  });

  //Funtion takes in the stack's screen position and prevents it from exceeding the set boundries
  function collisionCheck(pos: number) {
    if (pos > stackCollision().left) {
      return stackCollision().left as number;
    } else if (pos < stackCollision().right) {
      return stackCollision().right as number;
    } else {
      return pos;
    }
  }

  //This function is called when mouseDown and will loop while mouse down to track the stack's "speed"
  //Once mouseUp the function contiues to loop rather than tracking the "speed" it:
  //A. Moves the stack in the direction it was being dragged and then B. Reduces the speed and loops.
  //Once the speed falls below one it will revert the stack state back to "still"
  //This creates an ice-rink like effect
  function drift() {
    function loop() {
      if (stackDragging() === "dragging") {
        setStackDriftSpeed(stackDrift() - stackPosition());
        const newStackDrift = stackPosition();
        setStackDrift(newStackDrift);
        setTimeout(loop, 20);
      } else if (stackDragging() === "drifting") {
        if (Math.abs(stackDriftSpeed()) > 1) {
          //Adjusting the single integer at the end of newStackSpeed will change the stack's "friction"
          //A higher number means lower "friction" and visa versa. Numbers below 1 will cause no friction
          const newStackSpeed = stackDriftSpeed() - stackDriftSpeed() / 10;
          const newStackPos = (() => {
            if (newStackSpeed > 0) {
              return stackPosition() - Math.abs(newStackSpeed);
            } else if (newStackSpeed < 0) {
              return stackPosition() + Math.abs(newStackSpeed);
            }
          })();
          setStackPosition(collisionCheck(newStackPos as number));
          setStackDriftSpeed(newStackSpeed);
          setTimeout(loop, 20);
        } else if (stackDragging() === "drifting" && stackDriftSpeed() < 1) {
          dragToStill();
          setStackDriftSpeed(0);
        }
      }
    }
    loop();
  }

  function slide(ticks: number) {
    const halfBinder = binderSize() / 2;

    const screenCenter = window.innerWidth / 2;

    const binderInStack = binderSize() * selectedBinder() - halfBinder;

    setSelectedBinderPosition(stackPosition() + binderInStack);

    let totalDistanceToTravel = screenCenter - selectedBinderPosition();

    function loop() {
      if (Math.abs(totalDistanceToTravel) > 2) {
        console.log("total distance to travel:", totalDistanceToTravel);
        setNewStackPosition(
          collisionCheck(stackPosition() + totalDistanceToTravel)
        );
        setStackPosition(collisionCheck(newStackPosition()));
        totalDistanceToTravel = screenCenter - selectedBinderPosition();
        setTimeout(loop, ticks);
      }
    }

    loop();
  }

  createEffect(() => {
    if (selectedBinder() > 0) {
      slide(50);
    }
  });

  return (
    <div
      class="stackHandle"
      ref={stackHandle}
      onmouseenter={() => {
        stackHovered = true;
        if (stackDragging() !== "dragging") {
          document.body.style.cursor = "grab";
        }
      }}
      onmouseleave={() => {
        stackHovered = false;
        if (stackDragging() === "still") {
          document.body.style.cursor = "auto";
        }
      }}
      style={{
        //This is the property that handles the rendering of the stack position
        left: `${collisionCheck(stackPosition())}px`,
        //Stackwidth is set on mount and updated on resize
        width: `${stackWidth()}px`,
        // cursor: `${cursorType()}`,
      }}
    >
      <div class="stackContainer">
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
              binderNum={gridCardIndex + 1}
            />
          );
        })}
      </div>
    </div>
  );
}
