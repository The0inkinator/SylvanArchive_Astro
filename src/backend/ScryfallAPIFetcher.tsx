import { createSignal, createEffect } from "solid-js";

interface CardIdOptions {
  cardSet?: string;
  cardCollectNum?: number;
  cardFace?: "front" | "back";
}

export function CardArtFetcher(
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
            cardVersions.map((cardObj: any) => {
              return cardObj.card_faces[selectedCardFace()];
            })
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

              break;
            }

            if (card.set === cardSet) {
              finalInp[2] = listPos;
            }

            if (
              card.set !== cardSet &&
              card.collector_number == cardCollectNum
            ) {
              finalInp[2] = listPos;
            }
          }

          if (finalInp[2] !== 0) {
            finalInp[0] = cardVersionArt()[finalInp[2]].image_uris;
            finalInp[1] = cardVersionArt()[finalInp[2]].image_uris.art_crop;
            fetchFinal();
          } else {
            fetchFinal();
          }
        }

        //Either there is an error or a name is input that is not found. Makes function always output fblthp art
        resolve(
          "https://cards.scryfall.io/art_crop/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.jpg?1559959349"
        );
      } catch (error) {
        resolve(
          "https://cards.scryfall.io/art_crop/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.jpg?1559959349"
        );
        console.error(`Error fetching card image for ${cardName}`, error);
      }
    });
  });
}

export function CardFetcher(
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
            cardVersions.map((cardObj: any) => {
              return cardObj.card_faces[selectedCardFace()];
            })
          );
        } else {
          setInitCardArt(initCard);
          setCardVersionArt(cardVersions);
        }

        finalInp[0] = initCardArt().image_uris;
        finalInp[1] = initCardArt().image_uris.normal;

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

              break;
            }

            if (card.set === cardSet) {
              finalInp[2] = listPos;
            }

            if (
              card.set !== cardSet &&
              card.collector_number == cardCollectNum
            ) {
              finalInp[2] = listPos;
            }
          }

          if (finalInp[2] !== 0) {
            finalInp[0] = cardVersionArt()[finalInp[2]].image_uris;
            finalInp[1] = cardVersionArt()[finalInp[2]].image_uris.normal;
            fetchFinal();
          } else {
            fetchFinal();
          }
        }

        //Either there is an error or a name is input that is not found. Makes function always output fblthp art
        resolve(
          "https://cards.scryfall.io/png/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.png?1559959349"
        );
      } catch (error) {
        resolve(
          "https://cards.scryfall.io/png/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.png?1559959349"
        );
        console.error(`Error fetching card image for ${cardName}`, error);
      }
    });
  });
}
