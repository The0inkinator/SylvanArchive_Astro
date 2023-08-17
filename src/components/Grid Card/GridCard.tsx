import './gridCardStyles.css';
import './popUpStyles.css';
import { createSignal, createEffect, onMount } from 'solid-js';
import MTGCardArt from '../../backend/MTGCardArt';

// let cardArt: string;

const [gridCardHovered, setGridCardHovered] = createSignal<boolean>(false);

export default function GridCard() {
  onMount(() => {
    console.log(MTGCardArt('Goblin Guide'));
  });

  console.log(MTGCardArt('Goblin Guide'));

  return (
    <>
      <div class="gridCardContainer">
        <div class="fullGridCard" tabindex="0">
          <div
            class="gridCardBox"
            onmouseenter={() => {
              setGridCardHovered(true);
            }}
            onmouseleave={() => {
              setGridCardHovered(false);
            }}
          >
            <div
              class="gridCardImage"
              // style={`background-image: url("${cardArt}")`}
            ></div>
            <div class="overlay"></div>
            <div class="gridCardTitle">Title</div>
            <a class="link"></a>
          </div>

          <div class="popUpContainer">
            <div class="popUpCard"></div>
            <div class="popUpCard"></div>
            <div class="popUpCard"></div>
          </div>
        </div>
      </div>
    </>
  );
}
