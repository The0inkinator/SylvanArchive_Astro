import { createEffect, createSignal } from "solid-js";
import "./headerMenuStyles.css";
import HomeButton from "./HomeButton";

export const [homeScrolled, setHomeScrolled] = createSignal(false);
export const [searchFocused, setSearchFocused] = createSignal(false);
export const [bookmarksFocused, setBookmarksFocused] = createSignal(false);

export default function HeaderMenuT() {
  switch (homeScrolled()) {
    case true:
      return (
        <>
          <div id="menu">
            <HomeButton />
            <SearchBar />
            <BookmarkBar />
            <AccountButton />
          </div>
        </>
      );
    case false:
      return (
        <>
          <div id="menu">
            <HomeButton />
            <SearchBar />
            <BookmarkBar />
            <AccountButton />
            <TestElement />
          </div>
        </>
      );
  }
}

const TestElement = () => {
  const [count, setCount] = createSignal(0);
  setCount(0);
  const increment = () => {
    setCount(count() + 1);
    console.log(count());
  };

  function ActiveUI() {
    switch (count()) {
      case 0:
        return (
          <div onclick={() => increment()} style="pointer-events: auto;">
            0
          </div>
        );
        break;
      case 1:
        return <div>1</div>;
        break;
      // default:
      //   <div>69</div>;
    }
  }

  return (
    <>
      <div onclick={() => increment()} style="pointer-events: auto;">
        0
      </div>
      <ActiveUI />
    </>
  );
};

const SearchBar = () => {
  return (
    <>
      <div class="searchBarContainer">
        <div id="searchBar">
          <div id="searchBarLogo"></div>
          <input
            tabindex="0"
            id="searchBarInput"
            value="Start searching"
            type="text"
          />
          <div id="searchCloseButton">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

const BookmarkBar = () => {
  return (
    <>
      <div class="bookmarkBarContainer">
        <div id="bookmarkBar">
          <div id="bookmarkBarLogo"></div>
          <div tabindex="0" id="bookmarkDropdown">
            Bookmarks
          </div>
          <div id="bookmarkCloseButton">
            <div></div>
            <div></div>
          </div>
        </div>
        <ul id="bookmarkListContainer"></ul>
      </div>
    </>
  );
};

const AccountButton = () => {
  return (
    <>
      <div tabindex="-1" class="accountButtonContainer">
        <a tabindex="0" href="/Account" id="accountButton">
          <div id="accountButtonLogo"></div>
        </a>
      </div>
    </>
  );
};
