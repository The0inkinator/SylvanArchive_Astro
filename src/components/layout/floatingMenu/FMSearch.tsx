import { createEffect, createSignal } from "solid-js";
import { menuState, setMenuState } from "./FloatingMenu";

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
  searchCloseButton.style.display = "none";
  //Logic
  searchBarInput.blur();
};

export default function FMSearch() {
  // Visually adjusts based on menuState
  createEffect(() => {
    if (menuState() === "searchOpen") {
      openSearch();
    } else {
      closeSearch();
    }
  });

  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <div
          ref={searchBar}
          classList={{ button: true }}
          //Focuses correct element when component is clicked
          onClick={() => {
            if (menuState() !== "searchOpen") {
              searchBarInput.focus();
            }
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
            onFocusOut={() => {
              setMenuState("loading");
            }}
          />
          <div
            id="searchCloseButton"
            ref={searchCloseButton}
            //Timeout added to trigger after the onclick & focus listners above
            onClick={() => {
              setTimeout(() => {
                setMenuState("loading");
                searchBarInput.blur();
              }, 1);
            }}
          >
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
