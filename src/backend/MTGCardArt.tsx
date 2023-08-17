import { createSignal } from 'solid-js';

export default function MTGCardArt(name: string) {
  const [cardData, setCardData] = createSignal(null);

  const fetchCardArt = async () => {
    try {
      // console.log(`Fetching ${name}'s data`);
      const response = await fetch(
        `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`
      );
      // console.log('Response received:', response);
      const data = await response.json();

      setCardData(data);

      // console.log('Card data:', cardData());

      console.log('data returned', cardData().image_uris.art_crop);
      return cardData().image_uris.art_crop as string;
    } catch (error) {
      // console.error('Error fetching card data:', error);
    }
  };

  fetchCardArt();
}
