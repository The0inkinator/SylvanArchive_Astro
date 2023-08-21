//Gridcard is the component that visually an functionally links from
//the current grouping to a sub grouping or card list
//when defining the object it will need a minimum of:
// - link - a link to th page it represents
// - title - A title for that page displays on the card
// - display art - uses the art fetcher so it will require a minimum of a cardname
//but can take other identifiers
// - bg cards - can take up to three cards as bg cards it will adjust styling
// base on how many are passed to it, these also use the art fetcher and require a
// minimum of a card name for each

import "./gridCardStyles.css";
import { createSignal, createEffect, Switch, Match } from "solid-js";
import { CardArtFetcher, CardFetcher } from "../../backend/ScryfallAPIFetcher";

//TYPING
interface Identifiers {
  cardSet?: string;
  cardCollectNum?: number;
  cardFace?: "front" | "back";
}

type BgCard = {
  bgCard: string;
  identifiers?: Identifiers;
};
interface GridCardInputs {
  displayArt: string;
  mainArtIdentifiers?: Identifiers;
  bgCards?: (BgCard | string)[];
  title: string;
}

let popUpContainer: HTMLDivElement;
//Main function
export default function GridCard({
  displayArt,
  bgCards,
  mainArtIdentifiers,
  title,
}: GridCardInputs) {
  let bgCardArray: any[] = [];
  let bgCardPositions: string[] = [
    "translateY(calc(var(--GridCardSize) * 0)) translateX(calc(var(--GridCardSize) * .23)) rotate(0deg)",
  ];
  let bgCardRotation: number = 0;
  //State to asynchronously pass elements card art/images
  const [displayArtUrl, setDisplayArtUrl] = createSignal<string | null>(null);
  const [bgCardUrls, setBgCardUrls] = createSignal<any>([]);
  //States tracking if the card is hovered or focused
  const [gridCardHovered, setGridCardHovered] = createSignal<boolean>(false);
  const [gridCardFocused, setGridCardFocused] = createSignal<boolean>(false);

  //Inputs primary display art
  createEffect(async () => {
    const url = await CardArtFetcher(displayArt, {
      cardSet: mainArtIdentifiers?.cardSet,
      cardCollectNum: mainArtIdentifiers?.cardCollectNum,
      cardFace: mainArtIdentifiers?.cardFace,
    });
    setDisplayArtUrl(url);
  });

  //Inputs background card urls art into an array that can be mapped in the return
  createEffect(async () => {
    if (bgCards) {
      bgCardArray = await Promise.all(
        bgCards.map(async (card) => {
          let cardInfo: string;
          let mapCardSet: any;
          let mapCardCollectNum: any;
          let mapCardFace: any;
          if (typeof card === "string") {
            cardInfo = card;
          } else {
            cardInfo = card.bgCard;
            mapCardSet = card.identifiers?.cardSet;
            mapCardCollectNum = card.identifiers?.cardCollectNum;
            mapCardFace = card.identifiers?.cardFace;
          }

          return await CardFetcher(cardInfo, {
            cardSet: `${mapCardSet}`,
            cardCollectNum: mapCardCollectNum,
            cardFace: mapCardFace,
          });
        })
      );
      setBgCardUrls(bgCardArray);
    }
  });

  //Conditionally sets styling based on the number of Background Cards to be displayed
  createEffect(() => {
    if (bgCardUrls().length > 2) {
      bgCardRotation = 18;
      bgCardPositions[1] = `translateY(calc(var(--GridCardSize) * -0.16)) translateX(calc(var(--GridCardSize) * .08)) rotate(-${bgCardRotation}deg)`;
      bgCardPositions[2] = `translateY(calc(var(--GridCardSize) * -0.2)) translateX(calc(var(--GridCardSize) * 0.23)) rotate(-1deg)`;
      bgCardPositions[3] = `translateY(calc(var(--GridCardSize) * -0.16)) translateX(calc(var(--GridCardSize) * 0.36)) rotate(${bgCardRotation}deg)`;
    } else if (bgCardUrls().length === 2) {
      bgCardRotation = 15;
      bgCardPositions[1] = `translateY(calc(var(--GridCardSize) * -0.2)) translateX(calc(var(--GridCardSize) * .08)) rotate(-${bgCardRotation}deg)`;
      bgCardPositions[2] = `translateY(calc(var(--GridCardSize) * -0.2)) translateX(calc(var(--GridCardSize) * 0.36)) rotate(${bgCardRotation}deg)`;
    } else if (bgCardUrls().length === 1) {
      bgCardPositions[1] =
        "translateY(calc(var(--GridCardSize) * -.17)) translateX(calc(var(--GridCardSize) * .23)) rotate(0deg)";
    }
  });

  return (
    <>
      <div class="gridCardContainer">
        <div
          class="fullGridCard"
          tabindex="0"
          onfocusin={() => {
            setGridCardFocused(true);
          }}
          onFocusOut={() => {
            setGridCardFocused(false);
          }}
        >
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
                      gridCardHovered() === true || gridCardFocused() === true
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
