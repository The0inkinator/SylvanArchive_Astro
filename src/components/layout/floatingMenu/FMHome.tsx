import { createEffect } from "solid-js";
import { menuState, setMenuState } from "./FloatingMenu";

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
  // Set menuState to "loading" whenever user scrolls
  function ScrollCheck() {
    const setLoading = () => {
      setMenuState("loading");
    };

    createEffect(() => {
      window.addEventListener("scroll", () => {
        setLoading();
      });
      return () => {
        window.removeEventListener("scroll", () => {
          setLoading();
        });
      };
    });
  }

  ScrollCheck();

  // Converts "loading" menuState based on scroll position
  createEffect(() => {
    if (menuState() === "loading") {
      if (window.scrollY === 0) {
        setMenuState("homeOpen");
      } else {
        setMenuState("allClosed");
      }
    }
  });

  // Visually adjusts based on menuState
  createEffect(() => {
    if (menuState() === "homeOpen") {
      openHome();
    } else {
      closeHome();
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
          onFocusIn={() => {
            setMenuState("homeOpen");
          }}
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
