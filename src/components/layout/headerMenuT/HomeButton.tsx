import { homeScrolled, setHomeScrolled } from "./HeaderMenu";

export default function HomeButton() {
  const expandHome = () => {
    setHomeScrolled(false);
    console.log("Home Expanded");
  };
  const collapseHome = () => {
    setHomeScrolled(true);
    console.log(homeScrolled());
  };

  switch (homeScrolled()) {
    case true:
      return (
        <>
          <div
            class="homeButtonContainer"
            onclick={() => {
              expandHome();
            }}
          >
            <a tabindex="0" id="homeButton">
              <div id="homeButtonLogo"></div>
              <div id="homeButtonTitle">Sylvan Archive</div>
            </a>
          </div>
        </>
      );

    case false:
      return (
        <>
          <div
            class="homeButtonContainer"
            onclick={() => {
              collapseHome();
            }}
          >
            <a tabindex="0" id="homeButton">
              <div id="homeButtonLogo"></div>
              <div id="homeButtonTitle">Sylvan Archive</div>
            </a>
          </div>
        </>
      );
  }
}
