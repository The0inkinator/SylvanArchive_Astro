import { createEffect } from "solid-js";
import { menuState, setMenuState } from "./FloatingMenu";
import HomeButton from "../headerMenu/homeButton.astro";

let bookmarkBar: HTMLAnchorElement;
let bookmarkCloseButton: HTMLDivElement;

const openBookmark = () => {
  bookmarkBar.style.width =
    "calc(var(--MenuHeight) * 2.2 + var(--BookmarkBarWidth))";
  bookmarkBar.style.gridTemplateColumns =
    "var(--MenuHeight) 1fr var(--MenuHeight)";
  bookmarkCloseButton.style.display = "grid";
};
const closeBookmark = () => {
  bookmarkBar.style.width = "var(--MenuHeight)";
  bookmarkBar.style.gridTemplateColumns = "var(--MenuHeight) 0 0";
  bookmarkCloseButton.style.display = "none";
};

export default function FMBookmark() {
  createEffect(() => {
    if (menuState() === "bookmarkOpen") {
      openBookmark();
    } else {
      closeBookmark();
    }
  });

  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a
          ref={bookmarkBar}
          classList={{ button: true }}
          tabIndex="0"
          onFocusIn={() => {
            setMenuState("bookmarkOpen");
          }}
        >
          <div id="FMBookmarkIcon"></div>
          <div classList={{ fmHomeTitle: true }}>Bookmarks</div>
          <div
            id="bookmarkCloseButton"
            ref={bookmarkCloseButton}
            onClick={() => {
              setTimeout(() => {
                setMenuState("homeOpen");
                bookmarkBar.blur();
              }, 1);
            }}
          >
            <div></div>
            <div></div>
          </div>
        </a>
      </div>
    </>
  );
}
