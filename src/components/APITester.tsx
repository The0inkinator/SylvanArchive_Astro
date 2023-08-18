import { CardArtFetcher } from "../backend/ScryfallAPIFetcher";
import { createEffect, createSignal } from "solid-js";

export default function APITester({
  cardNameA,
  cardNameB,
}: {
  cardNameA: string;
  cardNameB: string;
}) {
  const [cardArtUrl_A, setCardArtUrl_A] = createSignal<string | null>(null);
  const [cardArtUrl_B, setCardArtUrl_B] = createSignal<string | null>(null);
  const [cardArtUrl_C, setCardArtUrl_C] = createSignal<string | null>(null);
  const [cardArtUrl_D, setCardArtUrl_D] = createSignal<string | null>(null);
  createEffect(async () => {
    const url = await CardArtFetcher(cardNameA);
    setCardArtUrl_A(url);
  });

  createEffect(async () => {
    const url = await CardArtFetcher(cardNameB);
    setCardArtUrl_B(url);
  });

  return (
    <>
      <button
        onClick={() => {
          console.log(cardArtUrl_A());
        }}
      >
        Run API Test
      </button>
      <div
        style={{
          "background-color": "red",
          width: "12rem",
          height: "12rem",
          "background-image": cardArtUrl_B()
            ? `url(${cardArtUrl_A()})`
            : "none",
        }}
      ></div>
      <div
        style={{
          "background-color": "red",
          width: "12rem",
          height: "12rem",
          "background-image": cardArtUrl_B()
            ? `url(${cardArtUrl_B()})`
            : "none",
        }}
      ></div>
    </>
  );
}
