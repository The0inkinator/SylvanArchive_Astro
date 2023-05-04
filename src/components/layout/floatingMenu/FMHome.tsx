import { createEffect } from "solid-js";
import { menuState, setMenuState } from "./FloatingMenu";
import { createScrollPosition } from "@solid-primitives/scroll";

const windowScroll = createScrollPosition
let homeButton: HTMLAnchorElement;
let homeTitle: HTMLDivElement;

const openHomeButton = () => {
  homeButton.style.width = "calc((var(--MenuHeight) * 4)";
  homeButton.style.gridTemplateColumns = "var(--MenuHeight) 0";
  homeTitle.style.display = "block";
  homeTitle.style.visibility = "visible";
  homeTitle.style.width = "100%";
};

const closeHomeButton = () => {
  homeButton.style.width = "var(--MenuHeight)";
  homeButton.style.gridTemplateColumns = "var(--MenuHeight) 0";
  homeTitle.style.display = "none";
  homeTitle.style.visibility = "visible";
  homeTitle.style.width = "0";
};

export default function FMHome() {
  createEffect(() => {
    if (menuState() !== "homeOpen") {
      closeHomeButton();
    } else {
      openHomeButton();
    }

    if ()
  });
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a
          classList={{
            button: true,
          }}
          ref={homeButton}
        >
          <div id="FMHomeIcon"></div>
          <div classList={{ fmHomeTitle: true }} ref={homeTitle}>
            Sylvan Archive
          </div>
        </a>
      </div>
    </>
  );
}
