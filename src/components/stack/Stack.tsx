import './stackStyles.css';
import Binder from '../binder/Binder';
import { default as MapList } from '../../lists/colors';
import { createSignal, createEffect, onMount } from 'solid-js';

let stackHandle: HTMLDivElement;

const [handleHovered, setHandleHovered] = createSignal<boolean>(false);
const [handleClicked, setHandleClicked] = createSignal<boolean>(false);

export default function Stack() {
  onMount(() => {
    createEffect(() => {
      if (handleHovered()) {
        stackHandle.style.cursor = 'grab';
      } else {
        stackHandle.style.cursor = 'auto';
      }
    });

    createEffect(() => {
      if (handleClicked()) {
        stackHandle.style.cursor = 'grabbing';
      } else {
        if (handleHovered()) {
          stackHandle.style.cursor = 'grab';
        } else {
          stackHandle.style.cursor = 'auto';
        }
      }
    });
  });

  return (
    <div
      class="stackHandle"
      ref={stackHandle}
      onMouseEnter={() => {
        setHandleHovered(true);
      }}
      onmouseleave={() => {
        setHandleHovered(false);
      }}
      onmousedown={() => {
        setHandleClicked(true);
      }}
      onmouseup={() => {
        setHandleClicked(false);
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
