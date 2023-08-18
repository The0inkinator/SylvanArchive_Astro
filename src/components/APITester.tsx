import { MTGCardArt } from "../backend/MTGCardArt";
import { createSignal } from "solid-js";

export default function APITester() {
  const cardArtUrl = MTGCardArt("Goblin Guide");

  return (
    <>
      <button
        onClick={() => {
          console.log(cardArtUrl);
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
