import "./gridCardStyles.css";
import "./popUpStyles.css";
import { createSignal, createEffect, Switch, Match } from "solid-js";
import { CardArtFetcher, CardFetcher } from "../../backend/ScryfallAPIFetcher";

interface cardInputs {
  displayArt: string;
  bgCards?: any[];
  title: string;
}

let popUpCardA: HTMLDivElement;
let popUpCardB: HTMLDivElement;
let popUpCardC: HTMLDivElement;

export default function GridCard({ displayArt, bgCards, title }: cardInputs) {
  const [displayArtUrl, setDisplayArtUrl] = createSignal<string | null>(null);
  const [bgCardUrls, setBgCardUrls] = createSignal<any>([]);
  const bgCardArray: any[] = [];

  createEffect(async () => {
    const url = await CardArtFetcher(displayArt, {
      cardSet: "2xm",
      cardCollectNum: 575,
    });
    setDisplayArtUrl(url);
  });

  createEffect(async () => {
    if (bgCards) {
      const tempBgCardArray = await Promise.all(
        bgCards.map(async (card) => {
          return await CardFetcher(card);
        })
      );
      bgCardArray.length = 0;
      tempBgCardArray.map((arrayItem, index) => {
        bgCardArray[index] = arrayItem;
      });
      setBgCardUrls(tempBgCardArray);
    }
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
            <div class="gridCardTitle">{title}</div>
            <a
              class="link"
              onclick={() => {
                console.log(bgCardArray.length);
              }}
            ></a>
          </div>

          <div class="popUpContainer">
            <Switch
              fallback={
                <>
                  <div
                    class="popUpCard"
                    style={{
                      "background-image": bgCardUrls()[1]
                        ? `url(${bgCardUrls()[1]})`
                        : "none",
                    }}
                  ></div>
                  <div
                    class="popUpCard"
                    style={{
                      "background-image": bgCardUrls()[0]
                        ? `url(${bgCardUrls()[0]})`
                        : "none",
                    }}
                  ></div>
                  <div
                    class="popUpCard"
                    style={{
                      "background-image": bgCardUrls()[2]
                        ? `url(${bgCardUrls()[2]})`
                        : "none",
                    }}
                  ></div>
                </>
              }
            >
              <Match when={bgCardArray.length == 1}>
                <div
                  class="popUpCard"
                  style={{
                    "background-image": bgCardUrls()[0]
                      ? `url(${bgCardUrls()[0]})`
                      : "none",
                  }}
                ></div>
              </Match>
              <Match when={bgCardArray.length == 2}>
                <div
                  class="popUpCard"
                  style={{
                    "background-image": bgCardUrls()[0]
                      ? `url(${bgCardUrls()[0]})`
                      : "none",
                  }}
                ></div>
              </Match>
              <Match when={bgCardArray.length > 2}>
                <div
                  class="popUpCard"
                  style={{
                    "background-image": bgCardUrls()[0]
                      ? `url(${bgCardUrls()[0]})`
                      : "none",
                  }}
                ></div>
              </Match>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}
