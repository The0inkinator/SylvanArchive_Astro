import './stackStyles.css';
import Binder from '../binder/Binder';
import { default as MapList } from '../../lists/colors';
import { createSignal, createEffect, onMount } from 'solid-js';

let stackHandle: HTMLDivElement;

const [handleHovered, setHandleHovered] = createSignal<boolean>(false);
const [handlePosition, setHandlePosition] = createSignal<number>(0);
const [isDragging, setIsDragging] = createSignal<Boolean>(false);

export default function Stack() {
  const handleMouseMove = (event: any) => {
    if (isDragging() && handleHovered()) {
      const newPosition = event.clientX;
      setHandlePosition(newPosition);
      console.log(newPosition);
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
      onMouseDown={() => {
        setIsDragging(true);
      }}
      onMouseUp={() => {
        setIsDragging(false);
      }}
      onmousemove={handleMouseMove}
      style={{
        left: `${handlePosition()}px`,
      }}
    >
      <div class="collisionBox">
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
          })}{' '}
        </div>
      </div>
    </div>
  );
}
