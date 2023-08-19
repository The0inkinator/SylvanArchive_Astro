import { createSignal, createEffect } from "solid-js";

interface CardIdOptions {
  cardSet?: string;
  cardCollectNum?: number;
  cardFace?: "front" | "back";
}

export function CardArtFetcherA(
  cardName: string,
  options: CardIdOptions = {}
): Promise<string | null> {
  return new Promise<string | null>(async (resolve) => {
    //Destructures typescript properties for easy referenece
    const { cardSet, cardCollectNum, cardFace } = options;
    //State for selected cardface
    const [selectedCardFace, setSelectedCardFace] = createSignal<number>(0);
    //Property denoting if the card is doublefaced
    const [doubleFaced, setDoubleFaced] = createSignal<boolean>(false);

    //Sets which face of the card is selected - defaults to front - selects back if cardFace property = back
    if (cardFace === "back") {
      setSelectedCardFace(1);
    } else {
      setSelectedCardFace(0);
    }

    createEffect(async () => {
      try {
        //Takes cardName prop and returns data
        const inputCardName = await fetch(
          `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
            cardName
          )}`
        );
        //Returns card data as a json object
        const initCard = await inputCardName.json();
        console.log(initCard);
        //Uses card object to find data of all versions of card
        const cardListFetch = await fetch(
          ` https://api.scryfall.com/cards/search?q=${initCard.name}%20unique%3Aprints
          `
        );
        //check if card is double faced
        if (initCard.card_faces) {
          setDoubleFaced(true);
        }
        const cardListObj = await cardListFetch.json();
        //creates an array where each item is a card version as an object
        const cardVersions = cardListObj.data;

        //Chooses art based on inputed factors
        if (
          !cardSet &&
          !cardCollectNum &&
          !cardFace &&
          doubleFaced() === false
        ) {
          if (initCard.image_uris && initCard.image_uris.art_crop) {
            resolve(initCard.image_uris.art_crop);
          }
        } else if (
          !cardSet &&
          !cardCollectNum &&
          !cardFace &&
          doubleFaced() === true
        ) {
          if (
            initCard.card_faces[selectedCardFace()].image_uris &&
            initCard.card_faces[selectedCardFace()].image_uris.art_crop
          ) {
            resolve(
              initCard.card_faces[selectedCardFace()].image_uris.art_crop
            );
          }
        }

        // if (cardCollectNum) {
        //   console.log('Collector number input:', cardCollectNum);
        // } else if (cardSet) {
        //   for (let listPos = 0; listPos < cardListObj.data.length; listPos++) {
        //     const card = cardListObj.data[listPos];

        //     if (card.set === cardSet) {
        //       if (
        //         cardListObj.data[listPos].image_uris &&
        //         cardListObj.data[listPos].image_uris.art_crop
        //       ) {
        //         resolve(cardListObj.data[listPos].image_uris.art_crop);
        //       }
        //       break;
        //     }
        //   }
        // } else {
        //   //Just a cardname is input and a match is found - if statement checks for art
        //   if (initCard.image_uris && initCard.image_uris.art_crop) {
        //     resolve(initCard.image_uris.art_crop);
        //   }
        // }

        //Either there is an error or a name is input that is not found. Makes function always output fblthp art
        resolve(
          "https://cards.scryfall.io/art_crop/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.jpg?1559959349"
        );
      } catch (error) {
        console.error(`Error fetching card image for "${cardName}"`, error);
      }
    });
  });
}

export function CardArtFetcher(cardName: string): Promise<string | null> {
  return new Promise<string | null>(async (resolve) => {
    const [cardArtUrl, setCardArtUrl] = createSignal<string | null>(null);

    createEffect(async () => {
      try {
        const response = await fetch(
          `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
            cardName
          )}`
        );

        const data = await response.json();

        if (data.image_uris && data.image_uris.art_crop) {
          setCardArtUrl(data.image_uris.art_crop);
          resolve(data.image_uris.art_crop);
        } else {
          resolve(
            "https://cards.scryfall.io/art_crop/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.jpg?1559959349"
          );
        }
      } catch (error) {
        console.error(`Error fetching card image for "${cardName}"`, error);
      }
    });
  });
}

export function CardFetcher(cardName: string): Promise<string | null> {
  return new Promise<string | null>(async (resolve) => {
    const [cardUrl, setCardUrl] = createSignal<string | null>(null);

    createEffect(async () => {
      try {
        const response = await fetch(
          `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
            cardName
          )}`
        );

        const data = await response.json();

        if (data.image_uris && data.image_uris.normal) {
          setCardUrl(data.image_uris.normal);
          resolve(data.image_uris.normal);
        } else {
          resolve(
            "https://cards.scryfall.io/png/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.png?1559959349"
          );
        }
      } catch (error) {
        console.error(`Error fetching card image for "${cardName}"`, error);
      }
    });
  });
}
