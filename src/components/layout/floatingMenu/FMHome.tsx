import { createEffect } from "solid-js";
import { menuState, setMenuState, windowScroll } from "./FloatingMenu";

let homeButton: HTMLAnchorElement;
let homeTitle: HTMLDivElement;
let initTitleWidth = () => window.getComputedStyle(homeTitle).width;

const openHome = () => {
  homeButton.style.width = `calc((var(--MenuHeight) * 1.2) + ${initTitleWidth()})`;
  homeButton.style.gridTemplateColumns = "var(--MenuHeight) 1fr";
};

const closeHome = () => {
  homeButton.style.width = "var(--MenuHeight)";
  homeButton.style.gridTemplateColumns = "var(--MenuHeight) 0";
};

export default function FMHome() {
  createEffect(() => {
    if (menuState() !== "homeOpen") {
      closeHome();
    } else {
      openHome();
    }
  });

  createEffect(() => {
    if (windowScroll.y > 0 && menuState() === "homeOpen") {
      setMenuState("allClosed");
    } else {
      setMenuState("homeOpen");
    }
  });

  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a
          href="/"
          tabIndex="0"
          classList={{
            button: true,
          }}
          ref={homeButton}
        >
          <div id="FMHomeIcon"></div>
          <div style={"display: flex"}>
            <div classList={{ fmHomeTitle: true }} ref={homeTitle}>
              Sylvan Archive
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
