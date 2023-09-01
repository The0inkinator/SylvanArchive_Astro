import './stackStyles.css';
import Binder from '../binder/Binder';
import { default as MapList } from '../../../lists';
import { createSignal, createEffect, onMount, onCleanup, For } from 'solid-js';
import { useStackDraggingContext } from '../../../context/StackDraggingContext';
import { useSelectedBinderContext } from '../../../context/SelectedBinderContext';
import { useActiveStackContext } from '../../../context/ActiveStackContext';

interface StackInputs {
  stackRef: string;
  stackFrom?: string;
  stackTo?: string;
}

// export const [selectedBinder, setSelectedBinder] = createSignal<number>(0);

export default function Stack({ stackRef, stackFrom, stackTo }: StackInputs) {
  //Property to track the pixel width of cards that the stack is made of
  const [binderSize, setBinderSize] = createSignal<number>(0);
  //Property to track the pixel width of the whole stack
  const [stackWidth, setStackWidth] = createSignal<number>(0);
  //Property to find the distance from mouse to stack corner
  const [stackOffsetX, setStackOffsetX] = createSignal<number>(0);
  //Tracks if mouse is over stack updated with a create effect in the body of the function
  let stackHovered: boolean = false;
  //Context state for dragging
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
  //Context States
  const [selectedBinder, { setCurrentBinder }]: any =
    useSelectedBinderContext();

  const [activeStack, { changeActiveStack }]: any = useActiveStackContext();
  //State for slide function
  const [distanceToSlide, setDistanceToSlide] = createSignal<number>(0);
  const [thisStackActive, setThisStackActive] = createSignal<boolean>(true);
  const [newMapList, setNewMapList] = createSignal<any[]>([]);

  //typing for refs
  let thisStack: HTMLDivElement | null = null;

  //Function that: Sets the stack pixel width, Positions the stack in the screen center, sets the collision boundries for the stack
  //Called both on mount and on screen resize

  //Calls setDefaults and adds event listeners to handle clicking and dragging of the stack

  onMount(() => {
    function setDefaults() {
      const windowWidth = window.innerWidth;
      const remSize = 16;
      if (thisStack) {
        const rootStyles = getComputedStyle(thisStack);
        setBinderSize(
          parseInt(rootStyles.getPropertyValue('--BinderSize')) * remSize
        );
      }

      setStackWidth(newMapList().length * binderSize());
      const stackStartingPos = () => {
        if (windowWidth - stackWidth() >= 0) {
          return windowWidth / 2 - stackWidth() / 2;
        } else {
          return (stackWidth() - windowWidth) / -2;
        }
      };
      setStackPosition(stackStartingPos);
      const collisionLeft = windowWidth / 2 - binderSize() / 2;
      const collisionRight =
        windowWidth / 2 - (stackWidth() - binderSize() / 2);
      setStackCollision({ left: collisionLeft, right: collisionRight });
    }

    import(`../../../lists${stackFrom}`).then((module) => {
      const dynamicMapList = module.default;
      if (dynamicMapList.length > 1) {
        setNewMapList(dynamicMapList);
        setDefaults();
      } else {
        console.log('invalid list');
        import('../../../lists').then((module) => {
          setNewMapList(module.default);
          setDefaults();
        });
      }
    });

    //handles window resize to update all relevant properties
    createEffect(() => {
      window.addEventListener('resize', setDefaults);

      onCleanup(() => {
        window.removeEventListener('resize', setDefaults);
      });
    });

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    changeActiveStack(thisStack);
  });

  //handles mouseDown
  const handleMouseDown = (event: MouseEvent) => {
    if (stackHovered) {
      changeActiveStack(thisStack);
    }
    if (thisStackActive() && stackHovered) {
      setStackOffsetX(event.clientX - stackPosition());
      document.body.style.cursor = 'grabbing';
      dragToDragging();
      drift();
      //calls drift function which handles the tracking and styling for the ice-rink effect
    }
  };

  //handles mouseMove
  const handleMouseMove = (event: MouseEvent) => {
    if (thisStackActive()) {
      if (stackDragging() === 'dragging') {
        const mousePosX = event.clientX;
        setNewStackPosition(collisionCheck(mousePosX - stackOffsetX()));
        setStackPosition(collisionCheck(newStackPosition()));
      }
    }
  };

  //handles mouseUp
  const handleMouseUp = (event: MouseEvent) => {
    if (thisStackActive()) {
      if (!stackHovered) {
        document.body.style.cursor = 'auto';
      } else {
        document.body.style.cursor = 'grab';
      }

      if (stackDragging() === 'dragging') {
        dragToDrifting();
      } else {
        dragToStill();
      }
    }
  };

  // createEffect(() => {
  //   console.log(stackDragging());
  // });

  //Function takes in the stack's screen position and prevents it from exceeding the set boundries
  function collisionCheck(pos: number) {
    if (pos > stackCollision().left) {
      return stackCollision().left as number;
    } else if (pos < stackCollision().right) {
      return stackCollision().right as number;
    } else {
      return pos;
    }
  }

  function capDriftSpeed(pos: number) {
    if (Math.abs(pos) > 20) {
      if (pos > 0) {
        return 20;
      } else if (pos < 0) {
        return -20;
      } else {
        return 0;
      }
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
    if (thisStackActive()) {
      function loop() {
        if (stackDragging() === 'dragging') {
          setStackDriftSpeed(capDriftSpeed(stackDrift() - stackPosition()));
          const newStackDrift = stackPosition();
          setStackDrift(newStackDrift);
          setTimeout(loop, 10);
        } else if (stackDragging() === 'drifting') {
          if (Math.abs(stackDriftSpeed()) > 1) {
            //Adjusting the single integer at the end of newStackSpeed will change the stack's "friction"
            //A higher number means lower "friction" and visa versa. Numbers below 1 will cause no friction
            const newStackSpeed = stackDriftSpeed() - stackDriftSpeed() / 13;
            const newStackPos = (() => {
              if (newStackSpeed > 0) {
                return stackPosition() - Math.abs(newStackSpeed);
              } else if (newStackSpeed < 0) {
                return stackPosition() + Math.abs(newStackSpeed);
              }
            })();
            setStackPosition(collisionCheck(newStackPos as number));
            setStackDriftSpeed(newStackSpeed);
            setTimeout(loop, 5);
          } else if (stackDragging() === 'drifting' && stackDriftSpeed() < 1) {
            dragToStill();
            setStackDriftSpeed(0);
          }
        }
      }
      loop();
    }
  }

  function slide(binder: number) {
    if (thisStackActive()) {
      setCurrentBinder(0.5);
      const halfBinder = binderSize() / 2;
      const screenCenter = window.innerWidth / 2;
      const binderInStack = binderSize() * binder - halfBinder;
      setDistanceToSlide(screenCenter - (stackPosition() + binderInStack));
      function loop() {
        if (Math.abs(distanceToSlide()) > 1) {
          let slideIncrement: number;
          setDistanceToSlide(screenCenter - (stackPosition() + binderInStack));
          slideIncrement = distanceToSlide() / 8;
          setNewStackPosition(collisionCheck(stackPosition() + slideIncrement));
          setStackPosition(newStackPosition());

          setTimeout(loop, 1);
        } else {
          dragToStill();
          setCurrentBinder(binder);
        }
      }

      loop();
    }
  }

  createEffect(() => {
    if (thisStack === activeStack()) {
      setThisStackActive(true);
    } else {
      setThisStackActive(false);
    }
  });

  return (
    <div
      class={`stackHandle ${stackRef}`}
      ref={(el) => (thisStack = el)}
      onmouseenter={() => {
        stackHovered = true;
        if (stackDragging() !== 'dragging') {
          document.body.style.cursor = 'grab';
        }
      }}
      onclick={() => {}}
      onmouseleave={() => {
        stackHovered = false;
        if (stackDragging() === 'still') {
          document.body.style.cursor = 'auto';
        }
      }}
      style={{
        //This is the property that handles the rendering of the stack position
        left: `${collisionCheck(stackPosition())}px`,
        //Stackwidth is set on mount and updated on resize
        width: `${stackWidth()}px`,
        opacity: thisStackActive() ? '100%' : '50%',
      }}
    >
      <div class="stackContainer">
        <For
          each={newMapList()}
          fallback={<div class="loadingListText">Loading List...</div>}
        >
          {(item: any, index: any) => {
            const tempBgCardList = item.bgCards?.map((bgCard: any) => {
              return {
                cardName: bgCard.cardName,
                cardSet: bgCard.cardSet,
                cardCollectNum: bgCard.cardCollectNum,
                cardFace: bgCard.cardFace,
              };
            });

            return (
              <Binder
                title={item.title}
                displayArt={{
                  cardName: item.displayArt.cardName,
                  cardSet: item.displayArt?.cardSet,
                  cardCollectNum: item.displayArt?.cardCollectNum,
                  cardFace: item.displayArt?.cardFace,
                }}
                bgCards={tempBgCardList}
                binderNum={index() + 1}
                binderParent={thisStack}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}