import { CardArt } from "../backend/CardArt";
import { createEffect, createSignal } from "solid-js";

export default function APITester({ cardName }: { cardName: string }) {
  const [cardArtUrl, setCardArtUrl] = createSignal<string | null>(null);
  createEffect(async () => {
    const url = await CardArt(cardName);
    setCardArtUrl(url);
  });

  return (
    <>
      <button
        onClick={() => {
          console.log(cardArtUrl());
        }}
      >
        Run API Test
      </button>
      <div
        style={{
          "background-color": "red",
          width: "12rem",
          height: "12rem",
          "background-image": cardArtUrl() ? `url(${cardArtUrl()})` : "none",
        }}
      ></div>
    </>
  );
}
