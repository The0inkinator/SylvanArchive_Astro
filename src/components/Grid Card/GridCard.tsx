import "./gridCardStyles.css";
import "./popUpStyles.css";
import { createSignal, createEffect, onMount } from "solid-js";
import { CardArtFetcher, CardFetcher } from "../../backend/ScryfallAPIFetcher";

export default function GridCard({
  displayArt,
  bgCard1,
  bgCard2,
  bgCard3,
}: {
  displayArt: string;
  bgCard1: string;
  bgCard2: string;
  bgCard3: string;
}) {
  const [displayArtUrl, setDisplayArtUrl] = createSignal<string | null>(null);
  const [bgCard1Url, setBgCard1Url] = createSignal<string | null>(null);
  const [bgCard2Url, setBgCard2Url] = createSignal<string | null>(null);
  const [bgCard3Url, setBgCard3Url] = createSignal<string | null>(null);

  createEffect(async () => {
    const url = await CardArtFetcher(displayArt, {
      cardSet: "2xm",
      cardCollectNum: 575,
    });
    setDisplayArtUrl(url);
  });

  createEffect(async () => {
    const url = await CardFetcher(bgCard1);
    setBgCard1Url(url);
  });

  createEffect(async () => {
    const url = await CardFetcher(bgCard2);
    setBgCard2Url(url);
  });

  createEffect(async () => {
    const url = await CardFetcher(bgCard3);
    setBgCard3Url(url);
  });

  return (
    <>
      <div class="gridCardContainer">
        <div class="fullGridCard" tabindex="0">
          <div class="gridCardBox">
            <div
              class="gridCardImage"
              style={{
                "background-image": displayArtUrl()
                  ? `url(${displayArtUrl()})`
                  : "none",
              }}
            ></div>
            <div class="overlay"></div>
            <div class="gridCardTitle">Title</div>
            <a class="link"></a>
          </div>

          <div class="popUpContainer">
            <div
              class="popUpCard"
              style={{
                "background-image": bgCard1Url()
                  ? `url(${bgCard1Url()})`
                  : "none",
              }}
            ></div>
            <div
              class="popUpCard"
              style={{
                "background-image": bgCard2Url()
                  ? `url(${bgCard2Url()})`
                  : "none",
              }}
            ></div>
            <div
              class="popUpCard"
              style={{
                "background-image": bgCard3Url()
                  ? `url(${bgCard3Url()})`
                  : "none",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
