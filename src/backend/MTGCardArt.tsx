import { createSignal, createEffect } from "solid-js";

export function MTGCardArt(cardName: string): Promise<string | null> {
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

        if (data.image_uris && data.image_uris.normal) {
          setCardArtUrl(data.image_uris.normal);
          resolve(data.image_uris.normal);
        }
      } catch (error) {
        console.error(`Error fetching card image for "${cardName}"`, error);
        setCardArtUrl(
          "https://cards.scryfall.io/art_crop/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.jpg?1559959349"
        );
        resolve(null);
      }
    });
  });
}
