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

import './gridCardStyles.css';
import { createSignal, createEffect, Switch, Match } from 'solid-js';
import {
  CardArtFetcher,
  CardFetcher,
  SmallCardFetcher,
} from '../../backend/ScryfallAPIFetcher';

//TYPING
interface CardFetcherInputs {
  cardName: string;
  cardSet?: string;
  cardCollectNum?: number;
  cardFace?: 'front' | 'back';
}
interface GridCardInputs {
  displayArt: CardFetcherInputs;
  bgCards?: CardFetcherInputs[];
  title: string;
}

let popUpContainer: HTMLDivElement;
//Main function
export default function GridCard({
  displayArt,
  bgCards,
  title,
}: GridCardInputs) {
  //Empty styling properties for bgCards
  let bgCardArray: any[] = [];
  let bgCardPositions: string[] = ['translate(-50%, -50%)'];
  let bgCardRotation: number = 0;
  let bgCardSize: number = 65;
  //State to asynchronously pass elements card art/images
  const [displayArtUrl, setDisplayArtUrl] = createSignal<string | null>(null);
  const [bgCardUrls, setBgCardUrls] = createSignal<any>([]);
  //States tracking if the card is hovered or focused
  const [gridCardHovered, setGridCardHovered] = createSignal<boolean>(false);
  const [gridCardFocused, setGridCardFocused] = createSignal<boolean>(false);

  //Inputs primary display art
  createEffect(async () => {
    const url = await CardArtFetcher(displayArt.cardName, {
      cardSet: displayArt?.cardSet,
      cardCollectNum: displayArt?.cardCollectNum,
      cardFace: displayArt?.cardFace,
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
          if (typeof card === 'string') {
            cardInfo = card;
          } else {
            cardInfo = card.cardName;
            mapCardSet = card.cardSet;
            mapCardCollectNum = card.cardCollectNum;
            mapCardFace = card.cardFace;
          }

          return await SmallCardFetcher(cardInfo, {
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
      bgCardRotation = 20;
      bgCardSize = 75;
      bgCardPositions[1] = `translate(-65%, -88%) rotate(-${bgCardRotation}deg)`;
      bgCardPositions[2] = `translate(-50%, -90%) rotate(-1deg)`;
      bgCardPositions[3] = `translate(-35%, -87%) rotate(${bgCardRotation}deg)`;
    } else if (bgCardUrls().length === 2) {
      bgCardRotation = 15;
      bgCardSize = 78;
      bgCardPositions[1] = `translate(-65%, -86%) rotate(-${bgCardRotation}deg)`;
      bgCardPositions[2] = `translate(-35%, -84%) rotate(${bgCardRotation}deg)`;
    } else if (bgCardUrls().length === 1) {
      bgCardRotation = 0;
      bgCardSize = 85;
      bgCardPositions[1] = `translate(-50%, -80%) rotate(-${bgCardRotation}deg)`;
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
                'background-image': displayArtUrl()
                  ? `url(${displayArtUrl()})`
                  : 'none',
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
                    'background-image': card ? `url(${card})` : 'none',
                    transform:
                      gridCardHovered() === true || gridCardFocused() === true
                        ? bgCardPositions[index + 1]
                        : bgCardPositions[0],
                    width:
                      gridCardHovered() === true || gridCardFocused() === true
                        ? `${bgCardSize}%`
                        : `$50%`,
                    height:
                      gridCardHovered() === true || gridCardFocused() === true
                        ? `${bgCardSize}%`
                        : `$50%`,
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
