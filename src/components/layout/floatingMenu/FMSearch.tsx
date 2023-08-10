import { createEffect } from "solid-js";
import { menuState, setMenuState, windowScroll } from "./FloatingMenu";

let searchBar: HTMLDivElement;
let searchBarInput: HTMLInputElement;
let searchCloseButton: HTMLDivElement;

const openSearch = () => {
  searchBar.style.width =
    "calc(var(--MenuHeight) * 2.2 + var(--SearchBarWidth))";
  searchBar.style.gridTemplateColumns =
    "var(--MenuHeight) 1fr var(--MenuHeight)";
  searchBarInput.style.cursor = "text";
  searchCloseButton.style.display = "grid";
};
const closeSearch = () => {
  searchBar.style.width = "var(--MenuHeight)";
  searchBar.style.gridTemplateColumns = "var(--MenuHeight) 0 0";
  searchBarInput.style.cursor = "text";
  searchCloseButton.style.display = "none";
  //Logic
  searchBarInput.blur();
};

export default function FMSearch() {
  // const conditionalClose = () => {
  //   if (windowScroll.y > 0) {
  //     setMenuState("allClosed");
  //     console.log(menuState());
  //   } else {
  //     setMenuState("homeOpen");
  //     console.log(menuState());
  //   }
  // };

  // createEffect(() => {
  //   if (menuState() === "searchOpen") {
  //     openSearch();
  //   } else {
  //     closeSearch();
  //   }
  // });
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <div
          tabIndex="-1"
          ref={searchBar}
          classList={{ button: true }}
          onClick={() => {
            searchBarInput.focus();
            setMenuState("searchOpen");
          }}
        >
          <div id="FMSearchIcon"></div>
          <input
            ref={searchBarInput}
            tabindex="0"
            id="searchInput"
            value="Start searching"
            type="text"
            onFocusIn={() => {
              setMenuState("searchOpen");
            }}
          />
          <div
            id="searchCloseButton"
            ref={searchCloseButton}
            // onClick={() => conditionalClose()}
          >
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
