import { createSignal, createEffect } from "solid-js";

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
