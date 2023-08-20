import "./gridCardStyles.css";
import "./popUpStyles.css";
import { createSignal, createEffect, Switch, Match } from "solid-js";
import { CardArtFetcher, CardFetcher } from "../../backend/ScryfallAPIFetcher";

interface cardInputs {
  displayArt: string;
  bgCards?: any[];
  title: string;
}
let popUpContainer: HTMLDivElement;

export default function GridCard({ displayArt, bgCards, title }: cardInputs) {
  let bgCardArray: any[] = [];
  let bgCardPositions: string[] = [
    "translateY(calc(var(--GridCardSize) * 0)) translateX(calc(var(--GridCardSize) * .23)) rotate(0deg)",
  ];
  let bgCardRotation: number = 0;
  const [displayArtUrl, setDisplayArtUrl] = createSignal<string | null>(null);
  const [bgCardUrls, setBgCardUrls] = createSignal<any>([]);
  const [gridCardHovered, setGridCardHovered] = createSignal<boolean>(false);

  //Inputs primary display art url

  createEffect(async () => {
    const url = await CardArtFetcher(displayArt, {
      cardSet: "2xm",
      cardCollectNum: 575,
    });
    setDisplayArtUrl(url);
  });

  //Inputs background card urls art into an array

  createEffect(async () => {
    if (bgCards) {
      bgCardArray = await Promise.all(
        bgCards.map(async (card) => {
          return await CardFetcher(card);
        })
      );
      setBgCardUrls(bgCardArray);
    }
  });

  createEffect(() => {
    if (bgCardUrls().length > 2) {
      bgCardRotation = 18;
      bgCardPositions[1] = `translateY(calc(var(--GridCardSize) * -0.1)) translateX(calc(var(--GridCardSize) * -0.05)) rotate(-${bgCardRotation}deg)`;
      bgCardPositions[2] = `translateY(calc(var(--GridCardSize) * -0.17)) translateX(calc(var(--GridCardSize) * 0.23)) rotate(-1deg)`;
      bgCardPositions[3] = `translateY(calc(var(--GridCardSize) * -0.1)) translateX(calc(var(--GridCardSize) * 0.5)) rotate(${bgCardRotation}deg)`;
    } else if (bgCardUrls().length === 2) {
      bgCardRotation = 10;
      bgCardPositions[1] = `translateY(calc(var(--GridCardSize) * -0.17)) translateX(calc(var(--GridCardSize) * .07)) rotate(-${bgCardRotation}deg)`;
      bgCardPositions[2] = `translateY(calc(var(--GridCardSize) * -0.17)) translateX(calc(var(--GridCardSize) * 0.4)) rotate(${bgCardRotation}deg)`;
    } else if (bgCardUrls().length === 1) {
      bgCardPositions[1] =
        "translateY(calc(var(--GridCardSize) * -.17)) translateX(calc(var(--GridCardSize) * .23)) rotate(0deg)";
    }
  });

  return (
    <>
      <div class="gridCardContainer">
        <div class="fullGridCard" tabindex="0">
          <div class="gridCardBox">
            <div
              class="gridCardImage"
              style={{
                "background-image": displayArtUrl()
                  ? `url(${displayArtUrl()})`
                  : "none",
              }}
            ></div>
            <div class="overlay"></div>
            <div class="gridCardTitle">{title}</div>
            <a
              class="link"
              onmouseenter={() => {
                setGridCardHovered(true);
              }}
              onmouseleave={() => {
                setGridCardHovered(false);
              }}
            ></a>
          </div>

          <div class="popUpContainer" ref={popUpContainer}>
            {bgCardUrls().map((card: any, index: number) => {
              return (
                <div
                  class="popUpCard"
                  style={{
                    "background-image": card ? `url(${card})` : "none",
                    transform:
                      gridCardHovered() === true
                        ? bgCardPositions[index + 1]
                        : bgCardPositions[0],
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
