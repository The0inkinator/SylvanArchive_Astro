import { CardArtFetcher, CardArtFetcherA } from '../backend/ScryfallAPIFetcher';
import { createEffect, createSignal } from 'solid-js';

export default function APITester() {
  const [cardArtUrl_A, setCardArtUrl_A] = createSignal<string | null>(null);
  createEffect(async () => {
    const url = await CardArtFetcherA('abundant harvest', {
      cardSet: 'sta',
    });
    setCardArtUrl_A(url);
  });

  return (
    <>
      <div style={'display: flex; flex-direction: column'}>
        <button
          onClick={() => {
            console.log(cardArtUrl_A());
          }}
        >
          Run API Test
        </button>
        <div
          style={{
            'background-color': 'red',
            width: '12rem',
            height: '12rem',
            'background-size': 'cover',
            'background-position': 'center',
            'background-image': cardArtUrl_A()
              ? `url(${cardArtUrl_A()})`
              : 'none',
          }}
        ></div>
      </div>
    </>
  );
}
