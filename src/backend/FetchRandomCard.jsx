import { createSignal, onCleanup } from 'solid-js';

function CardFetcher() {
  const [cardData, setCardData] = createSignal(null);

  onCleanup(() => {
    // Cleanup code if needed
  });

  const fetchRandomCard = async () => {
    try {
      const response = await fetch('https://api.scryfall.com/cards/random');
      const data = await response.json();
      setCardData(data);
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };

  return (
    <div>
      <h1>Random Magic: The Gathering Card</h1>
      <button onClick={fetchRandomCard}>Fetch Random Card</button>
      {cardData() && (
        <div>
          <h2>{cardData().name}</h2>
          <img src={cardData().image_uris.normal} alt={cardData().name} />
        </div>
      )}
    </div>
  );
}

export default CardFetcher;
