import { createSignal, createEffect } from 'solid-js';

export function CardArtFetcherA(
  cardName: string,
  cardSet: string | null,
  cardCollectNum: string | null
): Promise<string | null> {
  return new Promise<string | null>(async (resolve) => {
    const [cardArtUrl, setCardArtUrl] = createSignal<string | null>(null);

    createEffect(async () => {
      try {
        const inputCardName = await fetch(
          `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
            cardName
          )}`
        );

        const initCard = await inputCardName.json();

        const cardListFetch = await fetch(
          ` https://api.scryfall.com/cards/search?q=${initCard.name}%20unique%3Aprints
          `
        );

        const cardList = await cardListFetch.json();

        // console.log(
        //   'Data returned by awaiting cardListFetch.json():',
        //   cardList
        // );

        if (cardCollectNum) {
          console.log('Collector number input:', cardCollectNum);
        } else if (cardSet) {
          console.log('Set code input:', cardSet);
          // cardList.data.forEach((card: { set: string }, listPos: number) => {
          //   if (card.set === cardSet) {
          //     console.log('matched card set');
          //   }
          // });
          const cardSetMatch = cardList.data.some(
            (card: { set: string }, listPos: number) => {
              if (card.set === cardSet) {
                console.log('card set match found:', cardList.data[listPos]);
                return true;
              }
              console.log('no match found');
              return false;
            }
          );
        } else {
          if (initCard.image_uris && initCard.image_uris.art_crop) {
            console.log('card art found:', initCard.image_uris.art_crop);

            resolve(initCard.image_uris.art_crop);
          }
        }

        resolve(
          'https://cards.scryfall.io/art_crop/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.jpg?1559959349'
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
            'https://cards.scryfall.io/art_crop/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.jpg?1559959349'
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
            'https://cards.scryfall.io/png/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.png?1559959349'
          );
        }
      } catch (error) {
        console.error(`Error fetching card image for "${cardName}"`, error);
      }
    });
  });
}
