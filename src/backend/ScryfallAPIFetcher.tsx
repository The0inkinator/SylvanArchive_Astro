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
    //Modular state that updates based on whether the card is double faced
    const [initCardArt, setInitCardArt] = createSignal<any>(null);
    const [cardVersionArt, setCardVersionArt] = createSignal<any>(null);
    const [selectedCardVersion, setSelectedCardVersion] =
      createSignal<number>(0);
    //Fetch final card
    const finalInp: any[] = [{}, {}, 0];
    const fetchFinal = () => {
      if (finalInp[0] && finalInp[1]) {
        resolve(finalInp[1]);
      }
    };

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
        // console.log(initCard);
        //Uses card object to find data of all versions of card
        const cardListFetch = await fetch(
          ` https://api.scryfall.com/cards/search?q=${initCard.name}%20unique%3Aprints
          `
        );
        const cardListObj = await cardListFetch.json();
        //creates an array where each item is a card version as an object
        const cardVersions = cardListObj.data;

        //Updates the object path based on whether the card is double faced

        if (initCard.card_faces) {
          setInitCardArt(initCard.card_faces[selectedCardFace()]);
          setCardVersionArt(
            cardVersions[selectedCardVersion()].card_faces[selectedCardFace()]
          );
        } else {
          setInitCardArt(initCard);
          setCardVersionArt(cardVersions);
        }

        finalInp[0] = initCardArt().image_uris;
        finalInp[1] = initCardArt().image_uris.art_crop;

        //Chooses art based on inputed factors
        if (!cardSet && !cardCollectNum) {
          fetchFinal();
        } else {
          for (let listPos = cardVersions.length - 1; listPos >= 0; listPos--) {
            const card = cardVersions[listPos];

            if (
              card.set === cardSet &&
              card.collector_number == cardCollectNum
            ) {
              finalInp[2] = listPos;
              console.log("complete match found in position:", listPos);

              break;
            }

            if (card.set === cardSet) {
              finalInp[2] = listPos;
              console.log("partial match found in position:", listPos);
            }

            if (
              card.set !== cardSet &&
              card.collector_number == cardCollectNum
            ) {
              finalInp[2] = listPos;
              console.log("partial match found in position:", listPos);
            }
          }

          if (finalInp[2] !== 0) {
            console.log("used partial match for art");
            setSelectedCardVersion(finalInp[2]);
            console.log(cardVersionArt());
            finalInp[0] = cardVersionArt().image_uris;
            finalInp[1] = cardVersionArt().image_uris.art_crop;
            fetchFinal();
          } else {
            console.log("used fallback art");
            fetchFinal();
          }
        }

        //Either there is an error or a name is input that is not found. Makes function always output fblthp art
        resolve(
          "https://cards.scryfall.io/art_crop/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.jpg?1559959349"
        );
      } catch (error) {
        console.error(`Error fetching card image for ${cardName}`, error);
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
