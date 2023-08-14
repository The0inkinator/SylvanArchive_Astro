import "./gridCardStyles.css";
import "./popUpStyles.css";
import "../../../styles/zaGlobal.css";
import { createSignal, createEffect } from "solid-js";

const [gridCardHovered, setGridCardHovered] = createSignal<boolean>(false);

export default function GridCard() {
  return (
    <>
      <div class="gridCardContainer">
        <div class="fullGridCard">
          <div
            class="gridCardBox"
            onmouseenter={() => {
              setGridCardHovered(true);
            }}
            onmouseleave={() => {
              setGridCardHovered(false);
            }}
          >
            <div class="gridCardImage"></div>
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
